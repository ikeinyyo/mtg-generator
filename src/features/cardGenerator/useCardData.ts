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
