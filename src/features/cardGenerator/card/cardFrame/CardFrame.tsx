import Image from "next/image";
import { ManaText } from "./manaText/ManaText";
import { Textfit } from "react-textfit";

type Props = {
  color:
    | "artifact"
    | "black"
    | "blue"
    | "multi"
    | "red"
    | "white"
    | "land"
    | string;
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
        src={`/images/mtg_card_${attackDefense ? "creature_" : ""}${color}.jpg`}
        alt="MTG card frame"
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
      />
      <div
        className="absolute text-black font-semibold flex items-center"
        style={{
          top: "18px",
          left: "22px",
          width: "150px",
          height: "22px",
          fontFamily: "Beleren",
        }}
      >
        <Textfit mode="single" max={12} style={{ width: "100%" }}>
          {name}
        </Textfit>
      </div>
      <div
        className="absolute text-black"
        style={{ top: "20px", right: "22px", fontSize: "10px" }}
      >
        <ManaText text={manaCost} isCost={true} />
      </div>
      <div
        className="absolute text-black flex items-center"
        style={{
          bottom: "133px",
          left: "22px",
          width: "200px",
          height: "22px",
          fontFamily: "Beleren",
        }}
      >
        <Textfit mode="single" max={11} style={{ width: "100%" }}>
          {type}
        </Textfit>
      </div>
      <div
        className="absolute text-black"
        style={{
          top: "222px",
          left: "24px",
          right: "24px",
          fontFamily: "Mplantin",
        }}
      >
        <Textfit
          style={{ width: "200px", height: "86px" }}
          mode="multi"
          max={12}
          forceSingleModeWidth={false}
          min={8}
        >
          <ManaText text={text} isCost={false} />
        </Textfit>
      </div>
      <div
        className={`absolute ${
          color == "black" ? "text-white" : "text-black"
        } font-semibold`}
        style={{
          bottom: "24px",
          right: "22px",
          fontFamily: "Beleren",
          width: "38px",
          height: "14px",
          textAlign: "center",
        }}
      >
        <Textfit mode="single" max={14}>
          {attackDefense}
        </Textfit>
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
