import Image from "next/image";
import { CardFrame } from "./cardFrame/CardFrame";
import { CardData } from "../useCardData";

type Props = {
  isLoading: boolean;
  cardData: CardData | null;
};

const Card = ({ isLoading, cardData }: Props) => {
  return isLoading || !cardData ? (
    <Image
      src="/images/mtg_placeholder.png"
      alt="Back MTG card"
      width={252}
      height={360}
      className={isLoading ? "animate-pulse" : ""}
      style={{ marginBottom: "19px" }}
    />
  ) : (
    <div className="mb-2.5 transform transition-transform hover:scale-150 hover:z-10">
      <CardFrame
        color={cardData.color}
        name={cardData.name}
        type={cardData.type}
        text={cardData.text}
        manaCost={cardData.manaCost}
        attackDefense={cardData.attackDefense}
        cardImage={cardData.cardImage}
      />
    </div>
  );
};
export { Card };
