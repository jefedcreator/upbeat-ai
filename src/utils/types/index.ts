import { ChatCompletionRequestMessage } from "openai";

export interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
  playlist: Playlist | null;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
}

export type Reccomendations = {
  song: string;
  artist?: string;
}[];

export type Track = {
  name: string;
  image: string;
  artist: string;
};

export type Playlist = {
  name: string;
  description: string;
  url: string;
  image: string;
  tracks: Track[];
};
