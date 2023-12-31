"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { ChatCompletionRequestMessage } from "openai";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ContextProps, Reccomendations, Playlist } from "../types";
import {
  getData,
  getPlaylistData,
  getReccomendation,
  createPlaylist,
  updatePlaylist,
  shuffleArray,
} from "../helpers";

const ChatsContext = createContext<Partial<ContextProps>>({});

export const Upbeat = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const { data: session, status } = useSession() as any;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content:
          // "You will be provided with a description of a person's feeling, and your task is to generate an array of songs that matches the feelings if positive or improves the person's feelings if negative. return your output in an array 'reccomendations'.",
          "As a music recommender, Users will tell you what they want to listen to. you will understand the user preference and you will simply and precisely just return a list of music that exactly suits the user preference. ask the user for clarity if you do not understand",
      };
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "Hi, How can I help you today?",
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    // if (!messages?.length) {
    //   initializeChat();
    // }
    initializeChat();
  }, [reset]);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: "user",
        content,
      };

      // Add the user message to the state so we can see it immediately
      setMessages((messages) => {
        return [...messages, newMessage];
      });
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const url = "https://api.openai.com/v1/chat/completions";

      const body = JSON.stringify({
        messages,
        model: "gpt-4",
        stream: false,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      });

      const data = await response.json();

      const reply = data.choices[0].message;

      // Split the sentence into individual lines
      console.log("reply", reply);

      const lines = reply.content.split("\n");

      console.log("lines", lines);

      // Initialize the recommendations array
      const recommendations: Reccomendations = [];
      let containsNumericalList = false;

      // Loop through the lines and extract the song names and artists
      for (const line of lines) {
        // Check if the line starts with a number followed by a "."
        if (/^\d+\.\s*(.*?)\s*(?:by|-)?\s*(.*)$/.test(line)) {
          containsNumericalList = true;
          // Check if the line contains "by" to separate song name and artist
          if (/by/.test(line)) {
            // Extract the song name and artist from the line

            const [, song, artist] = line
              .match(/^\d+\.\s*"(.+?)"\s*by\s*(.+)$/)!
              .map((str: string) => str.trim());

            // Push the song name and artist as an object into the recommendations array
            recommendations.push({ song, artist });
          } else if (/-/.test(line)) {
            // Check if the line contains "-" to separate song name and artist
            // Extract the song name and artist from the line
            const [, song, artist] = line
              .match(/^\d+\.\s*"(.+?)"\s*-\s*(.+)$/)!
              .map((str: string) => str.trim());

            // Push the song name and artist as an object into the recommendations array
            recommendations.push({ song, artist });
          } else {
            // If no "by" or "-" found, assume only the song name is present
            const song = line.replace(/^\d+\.\s*"(.*?)".*$/, "$1");

            // Push the song name as an object into the recommendations array
            recommendations.push({ song });
          }
        }
      }

      // for (const line of lines) {
      //   // Check if the line starts with a number followed by a "."
      //   if (/^\d+\.\s*(.*?)\s*(?:by|-)?\s*(.*)$/.test(line)) {
      //     containsNumericalList = true;
      //     // Extract the song name and artist from the line
      //     console.log("song line", line);

      //     const [idk, song] = line
      //       .match(/^\d+\.\s*(.*?)\s*(?:by|-)?\s*(.*)$/)!
      //       .map((str: string) => str.trim());
      //     console.log("idk", idk, "song", song);

      //     // Push the song name and artist as an object into the recommendations array
      //     // recommendations.push({ song });
      //   }
      // }
      // If the reply does not contain a numerical list, add the recommendations to the state
      if (!containsNumericalList) {
        setMessages((messages) => [...messages, reply]);
      }

      // Check if the 'recommendations' array is not empty
      if (recommendations.length > 0) {
        // Map the 'recommendations' array to create a new array 'songs'
        // where the 'song' and 'artist' properties have spaces replaced by '%20'
        const songs = recommendations.map((r) => {
          return {
            song: r.song.replace(/ /g, "%20"),
            artist: r.artist ? r.artist.replace(/ /g, "%20") : null,
          };
        });

        // Log the modified 'songs' array containing encoded song and artist names
        console.log("songs:", songs);

        // Use Promise.all to handle asynchronous calls to 'getData' for each song
        const tracks = await Promise.all(
          songs.map((song) => getData(song.song, song.artist, session))
        );

        console.log("tracks", tracks);

        const trackIds = tracks.filter((id) => !!id);

        // Log the results of the asynchronous 'getData' calls for each song
        console.log("spotifyIds:", trackIds);

        // Function to shuffle the array randomly using Fisher-Yates algorithm
        // Shuffle the array and get the first three elements
        const shuffledTracks = shuffleArray(trackIds).slice(0, 3).join(",");

        //Get the tracks from spotify using the gpt generated tracks
        const spotifyTrackIds = await getReccomendation(
          shuffledTracks,
          session
        );

        // Create a new playlist on Spotify
        const playlistId = await createPlaylist(session);

        console.log("playlistId:", playlistId);

        // Update the created playlist with the fetched Spotify track IDs
        await updatePlaylist(playlistId, spotifyTrackIds, session);

        const playlistData = await getPlaylistData(playlistId, session);

        setPlaylist(playlistData);
      }
    } catch (error: any) {
      // Show error when something goes wrong
      toast.error(error.message);
      const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content:
          // "You will be provided with a description of a person's feeling, and your task is to generate an array of songs that matches the feelings if positive or improves the person's feelings if negative. return your output in an array 'reccomendations'.",
          "As a music recommender, Users will tell you what they want to listen to. you will understand the user preference and you will simply and precisely just return a list of music that exactly suits the user preference. ask the user for clarity if you do not understand",
      };
      const errorMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: `I didn't quite get that, please be more specific with your mood e.g "i feel happy"`,
      };
      setMessages([systemMessage, errorMessage]);
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        addMessage,
        messages,
        isLoadingAnswer,
        playlist,
        setReset,
        setPlaylist,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatsContext) as ContextProps;
};
