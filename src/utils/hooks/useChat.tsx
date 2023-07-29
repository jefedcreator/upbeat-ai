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

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

type Reccomendations = {
  song: string;
  artist?: string;
}[];

const ChatsContext = createContext<Partial<ContextProps>>({});

export const Upbeat = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const { data: session, status } = useSession() as any;

  const getData = async (song: string, artist: string | null) => {
    try {
      const response: any = await Promise.race([
        // fetch(`https://api.spotify.com/v1/search?q=track:${song}&type=track`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${session.accessToken}`,
        //   },
        // }),
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
      return res.tracks.items[0].id;

      //   if (res.statusCode === 200) {
      //     // const { result, count } = res;
      //     // return {
      //     //   extrasResult: result,
      //     //   extrasCount: count,
      //     // };
      //   } else {
      //     console.log(res.message);
      //   }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
  }, []);
  console.log("messages", messages);

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

      // Add the assistant message to the state after processing the response
      setMessages((messages) => [...messages, reply]);
      // Split the sentence into individual lines
      // console.log("reply", reply);

      const lines = reply.content.split("\n");
      console.log("lines", lines);

      // Initialize the recommendations array
      const recommendations: Reccomendations = [];

      // Loop through the lines and extract the song names and artists
      for (const line of lines) {
        // Check if the line starts with a number followed by a "."
        if (/^\d+\.\s*"(.*?)".*$/.test(line)) {
          // Check if the line contains "by" to separate song name and artist
          if (/by/.test(line)) {
            // Extract the song name and artist from the line
            const [, song, artist] = line
              .match(/^\d+\.\s*"(.+?)"\s*by\s*(.+)$/)
              .map((str: string) => str.trim());

            // Push the song name and artist as an object into the recommendations array
            recommendations.push({ song, artist });
          } else if (/-/.test(line)) {
            // Check if the line contains "-" to separate song name and artist
            // Extract the song name and artist from the line
            const [, song, artist] = line
              .match(/^\d+\.\s*"(.+?)"\s*-\s*(.+)$/)
              .map((str: string) => str.trim());

            // Push the song name and artist as an object into the recommendations array
            recommendations.push({ song, artist });
          } else {
            // If no "by" or "-" found, assume only the song name is present
            const song = line.replace(/^\d+\.\s*"(.*?)".*$/, "$1");

            // Push the song name as an object into the recommendations array
            recommendations!.push({ song });
          }
        }
      }

      console.log("recommendations", recommendations);

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

        // Use Promise.all to handle asynchronous calls to 'getData' for each song
        const spotifyId = await Promise.all(
          songs.map((song) => getData(song.song, song.artist))
        );

        // Log the modified 'songs' array containing encoded song and artist names
        console.log("songs:", songs);

        // Log the results of the asynchronous 'getData' calls for each song
        console.log("spotifyIds:", spotifyId);
      }

      // In the updated code, we check if recommendations is not null directly in the if condition. If it's not null, we proceed with the mapping operation to create an array of song names in uppercase (songs). This change makes the code more concise and efficient.

      // const splitReply = reply.split("");
      // const brackets = ["[", "]"];
      // if (splitReply.includes(brackets)) {
      //   const startIndex = reply.indexOf("[");
      //   const endIndex = reply.lastIndexOf("]");
      //   const extractedRecommendations = reply.slice(startIndex, endIndex + 1);
      //   console.log("extractedRecommendations", extractedRecommendations);
      // }
    } catch (error) {
      // Show error when something goes wrong
      //   addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider value={{ addMessage, messages, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatsContext) as ContextProps;
};
