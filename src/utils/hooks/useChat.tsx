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
        content: "i want you to act as a music therapist. users will tell you how they feel, it is your duty to deduce their emotions and recommend music from it to make them feel better if their emotion is negative or feel good music if the emotion is positive. do not tell me you are an AI language model, just go start to straight to recommending music, no more no less, no extra chitchat, just return a list of the music recommendations",
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
    initializeChat()
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
      // Add the assistant message to the state
      setMessages((messages) => {
        return [...messages, reply];
      });
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
