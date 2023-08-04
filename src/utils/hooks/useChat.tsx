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

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
  playlist: Playlist | null;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
}

type Reccomendations = {
  song: string;
  artist?: string;
}[];

type Track = {
  name: string;
  image: string;
  artist: string;
};

type Playlist = {
  name: string;
  description: string;
  url: string;
  image: string;
  tracks: Track[];
};

const ChatsContext = createContext<Partial<ContextProps>>({});

export const Upbeat = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const { data: session, status } = useSession() as any;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [reset, setReset] = useState(false);

  const getData = async (song: string, artist: string | null) => {
    try {
      const response: any = await Promise.race([
        fetch(
          `https://api.spotify.com/v1/search?q=track:${song}%20${
            artist && `artist:${artist}`
          }&type=track`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();
      // console.log("track res:", res.tracks.items[0].id ?? null);
      const id = res.tracks?.items[0]?.id ?? null;
      return id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getPlaylistData = async (playlistId: string) => {
    try {
      const response: any = await Promise.race([
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();

      const { name, description, external_urls, images, tracks: songs } = res;
      const tracks = songs.items.map((song: any) => {
        return {
          name: song.track.name,
          artist: song.track.artists[0].name,
          image: song.track.album.images[1].url,
        };
      });

      console.log("tracks", tracks);

      return {
        name,
        description,
        url: external_urls.spotify,
        image: images[1].url,
        tracks,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getReccomendation = async (tracks: string) => {
    try {
      const response: any = await Promise.race([
        fetch(
          `https://api.spotify.com/v1/recommendations?seed_tracks=${tracks}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();

      const spotifyTracks = res.tracks.map(
        (track: any) => `spotify:track:${track.id}`
      );

      return spotifyTracks;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const createPlaylist = async () => {
    try {
      const response: any = await Promise.race([
        fetch(`https://api.spotify.com/v1/users/${session.user}/playlists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            name: "Upbeat Playlist",
            description: "We hope this playlist makes you feel better 😉",
            public: false,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();

      return res.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updatePlaylist = async (
    playlistId: string,
    spotifyTrackIds: string[]
  ) => {
    try {
      const response: any = await Promise.race([
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            uris: spotifyTrackIds,
            position: 0,
          }),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();

      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionRequestMessage = {
        role: "system",
        content:
          // "You will be provided with a description of a person's feeling, and your task is to generate an array of songs that matches the feelings if positive or improves the person's feelings if negative. return your output in an array 'reccomendations'.",
          "You are to act as a music recommender engine. Users will tell you how they feel and you will simply and precisely just return a list of msuic depending on how the user feels",
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
        model: "gpt-3.5-turbo",
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
      // console.log("reply", reply);

      const lines = reply.content.split("\n");

      // Initialize the recommendations array
      const recommendations: Reccomendations = [];
      let containsNumericalList = false;

      // Loop through the lines and extract the song names and artists
      for (const line of lines) {
        // Check if the line starts with a number followed by a "."
        if (/^\d+\.\s*"(.*?)".*$/.test(line)) {
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
        // console.log("songs:", songs);

        // Use Promise.all to handle asynchronous calls to 'getData' for each song
        const tracks = await Promise.all(
          songs.map((song) => getData(song.song, song.artist))
        );

        // console.log("tracks", tracks);

        const trackIds = tracks.filter((id) => !!id);

        // Log the results of the asynchronous 'getData' calls for each song
        // console.log("spotifyIds:", trackIds);

        // Function to shuffle the array randomly using Fisher-Yates algorithm
        const shuffledTracks = shuffleArray(trackIds).slice(0, 3).join(",");

        // Shuffle the array and get the first three elements

        //Get the tracks from spotify using the gpt generated tracks
        const spotifyTrackIds = await getReccomendation(shuffledTracks);

        // console.log("spotifyReccomendations", spotifyReccomendations);
        // Create a new playlist on Spotify
        const playlistId = await createPlaylist();

        // Update the created playlist with the fetched Spotify track IDs
        const updatedPlaylist = await updatePlaylist(
          playlistId,
          spotifyTrackIds
        );

        console.log("updatedPlaylist", updatedPlaylist);

        const playlistData = await getPlaylistData(playlistId);

        // lof

        setPlaylist(playlistData);
      }
    } catch (error: any) {
      toast.error(error.message);
      // Show error when something goes wrong
      //   addToast({ title: 'An error occurred', type: 'error' })
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
