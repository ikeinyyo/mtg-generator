import { useMutation } from "@tanstack/react-query";
import { CardRequest } from "./domain";

export type CardData = {
  name: string;
  type: string;
  text: string;
  manaCost: string;
  attackDefense: string;
  cardImage: string;
  color: string;
};

export const defaultCardData: CardData = {
  name: "Gallardo, creador de cartas",
  type: "Criatura legendaria — Desarrollador humano",
  text: "Cuando Gallardo, creador de cartas entre al campo de batalla, busca en tu biblioteca una carta, pon esa carta en tu mano y luego baraja.<hr><i>Cuando dominó el poder de la Inteligencia Artificial, se convirtió en el creador de cartas más grande del multiverso.</i>",
  manaCost: "{1}{U}{B}",
  attackDefense: "1/4",
  color: "multi",
  cardImage: "/images/default.jpg",
};

const useCardData = (
  onSuccess: (cardData: CardData) => void,
  onError: () => void
) =>
  useMutation<CardData, Error, CardRequest>({
    mutationFn: async (cardRequest: CardRequest) => {
      const response = await fetch("/api/createCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to create card");
      }

      return response.json();
    },
    onSuccess: onSuccess,
    onError: onError,
  });

export default useCardData;
