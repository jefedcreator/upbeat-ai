"use client";
import { useState } from "react";
import { useChat } from "@/utils/hooks/useChat";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { VscSend } from "react-icons/vsc";
import { AiOutlineRedo } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const Interaction = () => {
  const {
    addMessage,
    isLoadingAnswer,
    messages,
    playlist,
    setReset,
    setPlaylist,
  } = useChat();
  const [interaction, setInteraction] = useState<string>("");
  const { data: session } = useSession() as any;
  const { width, height } = useWindowSize();

  const handleInteraction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await addMessage(interaction);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setInteraction("");
    }
  };

  const handleRedo = () => {
    setReset(true);
    setPlaylist(null);
  };

  return (
    <section className="text-white relative md:h-[85%] h-[80%]">
      {playlist && <Confetti width={width} height={height} />}
      <div className="h-[10%] flex flex-col items-center justify-center">
        <h2 className="text-center font-bold text-2xl">Interaction</h2>
      </div>
      <div className="md:min-h-[70%] min-h-[75%] flex flex-col gap-2">
        {messages
          .filter((message) => message.role !== "system")
          .map((message, index) => (
            <span key={index} className="flex items-center gap-2">
              <p>
                {message.role == "assistant" ? "Upbeat AI" : session.name} :
              </p>
              <p>{message.content}</p>
            </span>
          ))}
      </div>
      <form className="flex items-center justify-center w-full mx-auto gap-2">
        <input
          type="interact"
          id="interact"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[80%]"
          placeholder="I am feeling happy today do recommend me playlist"
          onChange={(e) => setInteraction(e.target.value)}
          value={interaction}
          required
        />
        <button
          type="submit"
          className="bg-[#1DB954] flex items-center justify-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center cursor-pointer w-[20%]"
          onClick={(e) => handleInteraction(e)}
        >
          {isLoadingAnswer ? <Loader /> : <VscSend />}
        </button>
      </form>
      {playlist && (
        <div className="md:w-[40%] w-[85%] h-[90%] md:h-[80%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black flex flex-col items-center justify-start gap-2 text-center p-5">
          <p>{playlist.name}</p>
          <p>{playlist.description}</p>
          <div className="min-h-[80%] md:min-h-[75%] w-full">
            <Image
              src={playlist.image}
              alt={playlist.name}
              width={100}
              height={100}
              className="w-full h-1/2 object-contain"
            />
            <div className="md:w-[50%] w-[80%] mx-auto h-1/2 flex flex-col justify-start gap-2 item-center overflow-auto scrollbar-hidden">
              {playlist.tracks.map((track: any, index) => (
                <div className="flex item-center gap-2" key={index}>
                  <Image
                    src={track.image}
                    alt={track.name}
                    width={35}
                    height={25}
                  />
                  <span className="flex flex-col text-left">
                    <p>{track.name}</p>
                    <p className="text-sm text-gray-500 font-light">
                      {track.artist}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <span className="flex items-center justify-around w-full">
            <div
              className="flex cursor-pointer items-center justify-center gap-1 text-[#1DB954] bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[40%] sm:w-auto px-5 py-2.5 text-center"
              onClick={handleRedo}
            >
              Restart
              <AiOutlineRedo />
            </div>
            <Link
              className="flex cursor-pointer items-center justify-center gap-1 text-white bg-[#1DB954] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[40%] sm:w-auto px-5 py-2.5 text-center"
              href={playlist.url}
              target="_blank"
            >
              Open
              <BsBoxArrowUpRight />
            </Link>
          </span>
        </div>
      )}
    </section>
  );
};

export default Interaction;
