"use client";
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Card } from "./card/Card";
import CreationBar from "./creationBar/CreationBar";
import { FaDownload, FaSave } from "react-icons/fa";
import useCardData, { CardData } from "./useCardData";

const CardGenerator = () => {
  const [isDownloadingImage, setDownloadingImage] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCreateImage = () => {
    if (cardRef.current === null) {
      return;
    }

    setDownloadingImage(true);
    toPng(cardRef.current, { backgroundColor: "transparent" })
      .then((dataUrl) => {
        download(dataUrl, "card.png");
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      })
      .finally(() => setDownloadingImage(false));
  };

  const onCreateImage = (cardData: CardData) => {
    setCardData(cardData);
    setLoading(false);
  };

  const { mutate: createImage } = useCardData(onCreateImage, () =>
    setLoading(false)
  );

  const onCreateImageAction = (prompt: string) => {
    setLoading(true);
    createImage({
      prompt,
    });
  };

  return (
    <>
      <CreationBar onCreate={onCreateImageAction} isLoading={isLoading} />
      <div ref={cardRef}>
        <Card isLoading={isLoading} cardData={cardData} />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg focus:outline-none w-40"
          onClick={handleCreateImage}
          disabled={isDownloadingImage}
        >
          <FaDownload className="mr-2" />
          Descargar
        </button>
        <button className="flex items-center justify-center bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none w-40">
          <FaSave className="mr-2" /> Guardar
        </button>
      </div>
    </>
  );
};

export { CardGenerator };
