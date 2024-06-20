"use client";
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Card } from "./card/Card";
import CreationBar from "./creationBar/CreationBar";
import { FaDownload, FaSave } from "react-icons/fa";
import useCardData, { CardData } from "./useCardData";
import useSaveCard from "../cardList/useSaveCard";

type Props = {
  onCardSaved: (cardUrl: string) => void;
};

const CardGenerator = ({ onCardSaved }: Props) => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDoActions, setDoActions] = useState<boolean>(false);
  const [isSavedCard, setSavedCard] = useState<boolean>(false);
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

  return (
    <>
      <CreationBar
        onCreate={onCreateImageAction}
        isLoading={isLoading || isDoActions}
      />
      <div ref={cardRef}>
        <Card isLoading={isLoading} cardData={cardData} />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg focus:outline-none w-40 disabled:bg-orange-900 disabled:cursor-not-allowed"
          onClick={handleCreateImage}
          disabled={isDoActions || isLoading || !cardData}
        >
          <FaDownload className="mr-2" />
          Descargar
        </button>
        <button
          className="flex items-center justify-center bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none w-40 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={saveCard}
          disabled={isDoActions || isLoading || !cardData || isSavedCard}
        >
          <FaSave className="mr-2" /> Guardar
        </button>
      </div>
    </>
  );
};

export { CardGenerator };
