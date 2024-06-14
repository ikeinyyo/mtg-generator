import Image from "next/image";
import { CardFrame } from "./cardFrame/CardFrame";

type Props = {
  isLoading: boolean;
};

const Card = ({ isLoading }: Props) => {
  return isLoading ? (
    <Image
      src="/images/mtg_placeholder.png"
      alt="Back MTG card"
      width={252}
      height={352}
    />
  ) : (
    <CardFrame
      color="multi"
      name="Rin and Seri, Inseparable"
      type="Legendary Creature — Dog Cat"
      text="
      Whenever you cast a Dog spell, create a 1/1 green Cat creature token.<br/>Whenever you cast a Cat spell, create a 1/1 white Dog creature token..<br/>{R}{G}{W}, {T}: Rin and Seri, Inseparable deals damage to any target equal to the number of Dogs you control. You gain life equal to the number of Cats you control."
      manaCost="{1}{R}{G}{W}"
      attackDefense="4/4"
      cardImage="https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/5/53/Rin-Seri.jpg/revision/latest?cb=20200620092205"
    />
  );
};
export { Card };
