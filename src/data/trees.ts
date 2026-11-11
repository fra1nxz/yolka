import type { TreeId } from "../types/tree";

export type TreeOption = {
  id: TreeId;
  name: string;
  description: string;
  color: string;
};

export const trees: TreeOption[] = [
  {
    id: "green",
    name: "Классическая",
    description: "Традиционная зелёная ёлка",
    color: "#176b49",
  },
  {
    id: "white",
    name: "Заснеженная",
    description: "Белая зимняя ёлка",
    color: "#e8edf5",
  },
];