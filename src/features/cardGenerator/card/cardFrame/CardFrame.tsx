import Image from "next/image";
import { ManaText } from "./manaText/ManaText";

type Props = {
  color: "artifact" | "black" | "blue" | "multi" | "red" | "white" | string;
  name: string;
  type: string;
  text: string;
  manaCost: string;
  attackDefense: string;
  cardImage: string;
};

const CardFrame = ({
  color,
  name,
  type,
  text,
  manaCost,
  attackDefense,
  cardImage,
}: Props) => {
  return (
    <div className="relative w-[252px] h-[352px]">
      <Image
        src={`/images/mtg_card_${color}.jpg`}
        alt="MTG card frame"
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
      />
      <div
        className="absolute text-black font-semibold"
        style={{ top: "21px", left: "22px", fontSize: "10px" }}
      >
        {name}
      </div>
      <div
        className="absolute text-black text-xs"
        style={{ top: "20px", right: "22px", fontSize: "10px" }}
      >
        <ManaText text={manaCost} isCost={true} />
      </div>
      <div
        className="absolute text-black"
        style={{ bottom: "137px", left: "22px", fontSize: "9px" }}
      >
        {type}
      </div>
      <div
        className="absolute text-black"
        style={{ top: "221px", left: "24px", right: "24px", fontSize: "8px" }}
      >
        <ManaText text={text} isCost={true} />
      </div>
      <div
        className={`absolute ${
          color == "black" ? "text-white" : "text-black"
        } text-sm font-semibold`}
        style={{ bottom: "12px", right: "22px" }}
      >
        {attackDefense}
      </div>
      <div className="absolute top-[11.8%] left-[8%] w-[84%] h-[44%]">
        <Image
          src={cardImage}
          alt="Card image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export { CardFrame };
