"use client";
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Card } from "./card/Card";
import CreationBar from "./creationBar/CreationBar";
import { FaDownload, FaSave, FaPaintBrush, FaRedo } from "react-icons/fa";
import useCardData, { CardData, defaultCardData } from "./useCardData";
import useSaveCard from "../cardList/useSaveCard";
import CardForm from "./cardForm/CardForm";

type Props = {
  onCardSaved: (cardUrl: string) => void;
};

const CardGenerator = ({ onCardSaved }: Props) => {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDoActions, setDoActions] = useState<boolean>(false);
  const [isSavedCard, setSavedCard] = useState<boolean>(false);
  const [previousPrompt, setPreviousPrompt] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCreateImage = () => {
    if (cardRef.current === null) {
      return;
    }

    setDoActions(true);
    toPng(cardRef.current, {
      backgroundColor: "transparent",
      includeQueryParams: true,
    })
      .then((dataUrl) => {
        download(dataUrl, cardData ? `${cardData.name}.png` : "card.png");
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      })
      .finally(() => setDoActions(false));
  };

  const onCreateImage = (cardData: CardData) => {
    setCardData(cardData);
    setLoading(false);
  };

  const { mutate: createImage } = useCardData(onCreateImage, () =>
    setLoading(false)
  );

  const { mutate: uploadCard } = useSaveCard(onCardSaved, () =>
    setLoading(false)
  );

  const onCreateImageAction = (prompt: string) => {
    setLoading(true);
    setSavedCard(false);
    createImage({
      prompt,
    });
  };

  const regenerateAll = () => {
    setLoading(true);
    setSavedCard(false);
    createImage({
      prompt: previousPrompt,
    });
  };

  const regenerateImage = () => {
    setLoading(true);
    setSavedCard(false);
    createImage({
      prompt: previousPrompt,
      previousCardData: cardData || undefined,
    });
  };

  const saveCard = () => {
    if (cardRef.current === null) {
      return;
    }

    setDoActions(true);
    toPng(cardRef.current, {
      backgroundColor: "transparent",
      includeQueryParams: true,
    })
      .then((dataUrl) => {
        uploadCard(dataUrl);
        setSavedCard(true);
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      })
      .finally(() => setDoActions(false));
  };

  const handleFormChange = (updatedData: CardData) => {
    setCardData(updatedData);
    setSavedCard(false);
  };

  return (
    <>
      <div
        className="flex flex-row justify-center items-start space-x-8 w-full p-4"
        style={{ background: "rgb(25, 25, 25)" }}
      >
        <div className="w-3/5">
          <CardForm
            isLoading={isLoading || !cardData}
            cardData={cardData}
            onFormChange={handleFormChange}
          />
        </div>
        <div className="pt-16">
          <div ref={cardRef}>
            <Card isLoading={isLoading} cardData={cardData} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          title="Download Card"
          className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white w-12 h-12 sm:w-32 rounded-lg focus:outline-none disabled:bg-orange-900 disabled:cursor-not-allowed"
          onClick={handleCreateImage}
          disabled={isDoActions || isLoading || !cardData}
        >
          <FaDownload className="sm:mr-2" />
          <span className="hidden sm:inline">Download</span>
        </button>
        <button
          title="Save Card"
          className="flex items-center justify-center bg-white hover:bg-gray-300 text-black w-12 h-12 sm:w-32 rounded-lg focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={saveCard}
          disabled={isDoActions || isLoading || !cardData || isSavedCard}
        >
          <FaSave className="sm:mr-2" />
          <span className="hidden sm:inline">Save</span>
        </button>
        <button
          title="Regenerate Illustration"
          className="flex items-center justify-center bg-white hover:bg-gray-300 text-black w-12 h-12 sm:w-32 rounded-lg focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={regenerateImage}
          disabled={isDoActions || isLoading || !cardData}
        >
          <FaPaintBrush className="sm:mr-2" />
          <span className="hidden sm:inline">Paint again</span>
        </button>
        <button
          title="Regenerate Card"
          className="flex items-center justify-center bg-white hover:bg-gray-300 text-black w-12 h-12 sm:w-32 rounded-lg focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={regenerateAll}
          disabled={isDoActions || isLoading || !cardData}
        >
          <FaRedo className="sm:mr-2" />
          <span className="hidden sm:inline">Re-generate</span>
        </button>
      </div>
      <CreationBar
        onCreate={onCreateImageAction}
        isLoading={isLoading || isDoActions}
        setPreviousPrompt={setPreviousPrompt}
      />
    </>
  );
};

export { CardGenerator };
