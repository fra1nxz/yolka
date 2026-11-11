
import type { DecorationType } from "../types/tree";

export type DecorationOption = {
  type: DecorationType;
  name: string;
  symbol: string;
  color: string;
};

export const decorations: DecorationOption[] = [
  {
    type: "red-ball",
    name: "Красный шар",
    symbol: "●",
    color: "#861f35",
  },
  {
    type: "gold-ball",
    name: "Золотой шар",
    symbol: "●",
    color: "#a77a24",
  },
  {
    type: "blue-ball",
    name: "Синий шар",
    symbol: "●",
    color: "#243e70",
  },
  {
    type: "silver-ball",
    name: "Серебряный шар",
    symbol: "●",
    color: "#65748c",
  },
  {
    type: "star",
    name: "Звезда",
    symbol: "✦",
    color: "#9b702c",
  },
  {
    type: "snowflake",
    name: "Снежинка",
    symbol: "❄",
    color: "#52647f",
  },
  {
    type: "bow",
    name: "Бантик",
    symbol: "🎀",
    color: "#752b4d",
  },
];
