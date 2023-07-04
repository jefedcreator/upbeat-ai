"use client";
import { useState } from "react";
import { useChat } from "@/utils/hooks/useChat";

const Interaction = () => {
  const { addMessage, isLoadingAnswer } = useChat();
  const [interaction, setInteraction] = useState<string>("");

  const handleInteraction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await addMessage(interaction);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setInteraction("");
    }
  };

  return (
    <section>
      <div>Interaction</div>
      {isLoadingAnswer && <p>Loading...</p>}
      <form>
        <div className="mb-6">
          <label
            htmlFor="interact"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            How are you feeling today?
          </label>
          <input
            type="interact"
            id="interact"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="How are you feeling today?"
            onChange={(e) => setInteraction(e.target.value)}
            value={interaction}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => handleInteraction(e)}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Interaction;
