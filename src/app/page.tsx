"use client";

import { CardGenerator } from "@/features/cardGenerator/CardGenerator";
import { CardList } from "@/features/cardList/cardList";
import useCardList from "@/features/cardList/useCardList";
import { useEffect, useState } from "react";

export default function Home() {
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

  const onCardSaved = (cardUrl: string) => {
    setCardList([cardUrl, ...cardList]);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <CardGenerator onCardSaved={onCardSaved} />
      <CardList isLoading={isLoading} cardList={cardList} />
    </main>
  );
}
