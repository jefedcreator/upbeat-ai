"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { ChatCompletionRequestMessage } from "openai";

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

export const Upbeat = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

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
      const recommendations = [];

      // Loop through the lines and extract the song names
      for (const line of lines) {
        // Check if the line starts with a number followed by a "."
        if (/^\d+\.\s*"(.*?)".*$/.test(line)) {
          // Remove the number and surrounding quotes from the line to get the song name
          const songName = line.replace(/^\d+\.\s*"(.*?)".*$/, "$1");
          recommendations.push(songName);
        }
      }

      console.log("recommendations", recommendations);

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
