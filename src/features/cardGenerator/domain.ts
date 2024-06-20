import { CardData } from "./useCardData";

export type CardRequest = {
  prompt: string;
  previousCardData?: CardData;
};
