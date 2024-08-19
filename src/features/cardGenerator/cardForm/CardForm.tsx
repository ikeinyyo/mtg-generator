import React from "react";
import { CardData } from "../useCardData";

type Props = {
  cardData: CardData | null;
  onFormChange: (updatedData: CardData) => void;
  isLoading: boolean;
};

const CardForm = ({ cardData, isLoading, onFormChange }: Props) => {
  const defaultData: CardData = {
    name: cardData?.name || "",
    type: cardData?.type || "",
    text: cardData?.text || "",
    manaCost: cardData?.manaCost || "",
    attackDefense: cardData?.attackDefense || "",
    cardImage: cardData?.cardImage || "",
    color: cardData?.color || "",
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedData = {
      ...defaultData,
      [name]: value,
    };
    onFormChange(updatedData);
  };

  return (
    <form
      className="p-4 rounded-lg shadow-md"
      style={{ background: "rgb(25, 25, 25)" }}
    >
      <div className="flex flex-col md:flex-row md:gap-4 mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-white font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={defaultData.name}
            onChange={handleChange}
            className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-white font-bold mb-2">Type:</label>
          <input
            type="text"
            name="type"
            value={defaultData.type}
            onChange={handleChange}
            className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2">Text:</label>
        <textarea
          name="text"
          value={defaultData.text}
          onChange={handleChange}
          className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
          style={{ minHeight: "120px", maxHeight: "120px" }}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-white font-bold mb-2">Mana Cost:</label>
          <input
            type="text"
            name="manaCost"
            value={defaultData.manaCost}
            onChange={handleChange}
            className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-white font-bold mb-2">
            Attack/Defense:
          </label>
          <input
            type="text"
            name="attackDefense"
            value={defaultData.attackDefense}
            onChange={handleChange}
            className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
            disabled={isLoading}
          />
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-white font-bold mb-2">Color:</label>
          <select
            name="color"
            value={defaultData.color}
            onChange={handleChange}
            className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded bg-white"
            disabled={isLoading}
          >
            <option value="artifact">Artifact</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="multi">Multi</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2">
          Card Image URL:
        </label>
        <input
          type="text"
          name="cardImage"
          value={defaultData.cardImage}
          onChange={handleChange}
          className="w-full p-2 border text-black bg-gray-200 border-gray-300 rounded"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default CardForm;
