import { useState } from "react";

type Props = {
  onCreate: (prompt: string) => void;
  isLoading: boolean;
  setPreviousPrompt: React.Dispatch<React.SetStateAction<string>>;
};

const CreationBar = ({ onCreate, isLoading, setPreviousPrompt }: Props) => {
  const [prompt, setPrompt] = useState("");
  const maxChars = 500;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isLoading && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (prompt.trim() === "") return;
    setPreviousPrompt(prompt);
    onCreate(prompt);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setPrompt(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="flex w-full max-w-screen-xl sm:w-3/5 rounded-lg overflow-hidden mb-2">
        <textarea
          value={prompt}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="flex-grow px-4 py-2 focus:outline-none text-black resize-none disabled:text-white"
          placeholder="Create a MTG Card..."
          disabled={isLoading}
          style={{ minHeight: "120px" }}
        />
      </div>
      <div className="flex justify-end w-full max-w-screen-xl sm:w-3/5 items-center">
        <div className="text-gray-500 text-sm flex-grow-0 flex-shrink-0">
          {prompt.length}/{maxChars}
        </div>
        <button
          className="bg-orange-600 rounded-lg hover:bg-orange-500 text-white px-4 py-2 ml-2 focus:outline-none disabled:bg-orange-900 disabled:cursor-not-allowed"
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
