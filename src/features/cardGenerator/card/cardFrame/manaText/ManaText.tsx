import "mana-font/css/mana.css";
type Props = {
  text: string;
  isCost: boolean;
};

const ManaText = ({ text, isCost }: Props) => {
  const getManaCost = (icon: string, isCost: boolean) =>
    `<li ${
      isCost === false ? 'style="font-size: 0.8em"' : ""
    } class="ms ms-cost ms-${icon} ${
      isCost ? "ms-space ms-shadow" : ""
    }"></li>`;

  const renderManaSymbols = (text: string, isCost: boolean) => {
    const replacedText = text
      .replace(/\{0\}/g, getManaCost("0", isCost))
      .replace(/\{1\}/g, getManaCost("1", isCost))
      .replace(/\{2\}/g, getManaCost("2", isCost))
      .replace(/\{3\}/g, getManaCost("3", isCost))
      .replace(/\{4\}/g, getManaCost("4", isCost))
      .replace(/\{5\}/g, getManaCost("5", isCost))
      .replace(/\{6\}/g, getManaCost("6", isCost))
      .replace(/\{7\}/g, getManaCost("7", isCost))
      .replace(/\{8\}/g, getManaCost("8", isCost))
      .replace(/\{9\}/g, getManaCost("9", isCost))
      .replace(/\{10\}/g, getManaCost("10", isCost))
      .replace(/\{11\}/g, getManaCost("11", isCost))
      .replace(/\{12\}/g, getManaCost("12", isCost))
      .replace(/\{T\}/g, getManaCost("tap", isCost))
      .replace(/\{W\}/g, getManaCost("w", isCost))
      .replace(/\{U\}/g, getManaCost("u", isCost))
      .replace(/\{B\}/g, getManaCost("b", isCost))
      .replace(/\{R\}/g, getManaCost("r", isCost))
      .replace(/\{G\}/g, getManaCost("g", isCost))
      .replace(/\{E\}/g, getManaCost("e", isCost))
      .replace(/\{C\}/g, getManaCost("c", isCost))
      .replace(/\{WU\}/g, getManaCost("wu", isCost))
      .replace(/\{WB\}/g, getManaCost("wb", isCost))
      .replace(/\{UB\}/g, getManaCost("ub", isCost))
      .replace(/\{UR\}/g, getManaCost("ur", isCost))
      .replace(/\{BR\}/g, getManaCost("br", isCost))
      .replace(/\{BG\}/g, getManaCost("bg", isCost))
      .replace(/\{RG\}/g, getManaCost("rg", isCost))
      .replace(/\{RW\}/g, getManaCost("rw", isCost))
      .replace(/\{GW\}/g, getManaCost("gw", isCost))
      .replace(/\{GU\}/g, getManaCost("gu", isCost))
      .replace(/\n/g, "<br/>");

    return { __html: replacedText };
  };

  return <span dangerouslySetInnerHTML={renderManaSymbols(text, isCost)} />;
};

export { ManaText };
