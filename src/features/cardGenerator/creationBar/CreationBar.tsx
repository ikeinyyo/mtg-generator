"use client";

import { useState } from "react";

type Props = {
  onCreate: (prompt: string) => void;
  isLoading: boolean;
};

const CreationBar = ({ onCreate, isLoading }: Props) => {
  const [prompt, setPrompt] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLoading && e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (prompt.trim() === "") return;
    setPrompt("");
    onCreate(prompt);
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="flex w-full max-w-screen-xl sm:w-3/5 rounded-lg overflow-hidden">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow px-4 py-2 focus:outline-none text-black"
          placeholder="Create a MTG Card..."
          disabled={isLoading}
        />
        <button
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 focus:outline-none disabled:bg-orange-900 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={sendMessage}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreationBar;
