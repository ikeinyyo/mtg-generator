"use client";

import { useEffect, useState } from "react";
import useCardList from "./useCardList";
import Image from "next/image";
import CardLoading from "./cardLoading/CardLoading";

const CardList = () => {
  const [cardList, setCardList] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const onCardListLoaded = (cardList: string[]) => {
    setCardList(cardList);
    setLoading(false);
  };

  const { mutate: loadCardList } = useCardList(onCardListLoaded, () =>
    setLoading(false)
  );

  useEffect(() => {
    loadCardList();
  }, []);

  return (
    <>
      <h2 className="text-2xl p-4">Card Library</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CardLoading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-cols-4 grid-cols-2 gap-4">
          {cardList.map((cardUrl) => (
            <div
              key={cardUrl}
              className="mb-2.5 transform transition-transform hover:scale-150 hover:z-10"
            >
              <Image
                src={cardUrl}
                alt="Back MTG card"
                width={252}
                height={360}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { CardList };
