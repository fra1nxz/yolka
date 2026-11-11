export type TreeId = "green" | "white";

export type DecorationType =
  | "red-ball"
  | "gold-ball"
  | "blue-ball"
  | "silver-ball"
  | "star"
  | "snowflake"
  | "bow";

export interface Decoration {
  id: string;
  type: DecorationType;
  x: number;
  y: number;
}

export interface TreePosition {
  x: number;
  y: number;
}

export interface EditorState {
  selectedTree: TreeId;
  decorations: Record<TreeId, Decoration[]>;
  garland: Record<TreeId, boolean>;
  navbarGarland: boolean;
  homeTreePosition: TreePosition;
}