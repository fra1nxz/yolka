
import type {
  RefObject,
  PointerEvent as ReactPointerEvent,
} from "react";

import type { Decoration, TreeId } from "../../types/tree";
import Garland from "./Garland";

import "./ChristmasTree.css";

interface ChristmasTreeProps {
  treeId: TreeId;
  decorations: Decoration[];
  garlandEnabled: boolean;
  treeRef?: RefObject<HTMLDivElement | null>;
  onDecorationPointerDown?: (
    event: ReactPointerEvent<HTMLButtonElement>,
    item: Decoration
  ) => void;
}

const decorationSymbols: Record<Decoration["type"], string> = {
  "red-ball": "●",
  "gold-ball": "●",
  "blue-ball": "●",
  "silver-ball": "●",
  star: "★",
  snowflake: "❄",
  bow: "🎀",
};

const greenDecorationColors: Record<Decoration["type"], string> = {
  "red-ball": "#e84b55",
  "gold-ball": "#f5ce63",
  "blue-ball": "#64b8ec",
  "silver-ball": "#dce6f5",
  star: "#ffdb72",
  snowflake: "#d8edff",
  bow: "#e879a8",
};

const whiteDecorationColors: Record<Decoration["type"], string> = {
  "red-ball": "#861f35",
  "gold-ball": "#a77a24",
  "blue-ball": "#243e70",
  "silver-ball": "#65748c",
  star: "#9b702c",
  snowflake: "#52647f",
  bow: "#752b4d",
};

export default function ChristmasTree({
  treeId,
  decorations,
  garlandEnabled,
  treeRef,
  onDecorationPointerDown,
}: ChristmasTreeProps) {
  const isWhite = treeId === "white";

  const decorationColors = isWhite
    ? whiteDecorationColors
    : greenDecorationColors;

  return (
    <div
      className={`tree-stage ${isWhite ? "white-tree" : "green-tree"}`}
      ref={treeRef}
    >
      <svg
        className="tree-svg"
        viewBox="0 0 400 520"
        role="img"
        aria-label={isWhite ? "Белая ёлка" : "Зелёная ёлка"}
      >
        <defs>
          <linearGradient id="green-branches" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b9b69" />
            <stop offset="55%" stopColor="#176442" />
            <stop offset="100%" stopColor="#0b392b" />
          </linearGradient>

          <linearGradient id="white-branches" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#dce9f6" />
            <stop offset="100%" stopColor="#9fb5d0" />
          </linearGradient>

          <linearGradient id="tree-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#70452e" />
            <stop offset="50%" stopColor="#a36b45" />
            <stop offset="100%" stopColor="#56351f" />
          </linearGradient>

          <filter id="tree-shadow">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <ellipse
          cx="200"
          cy="495"
          rx="105"
          ry="12"
          fill="#000"
          opacity="0.3"
          filter="url(#tree-shadow)"
        />

        <path
          d="M 175 410 L 225 410 L 235 495 L 165 495 Z"
          fill="url(#tree-trunk)"
        />

        <g className="tree-branches">
          <path
            d="M 200 35 L 240 125 L 220 118 L 270 190 L 240 180 L 300 250 L 100 250 L 160 180 L 130 190 L 180 118 L 160 125 Z"
            fill="url(#green-branches)"
            className="branch branch-top"
          />

          <path
            d="M 200 125 L 255 215 L 230 205 L 295 285 L 260 275 L 330 350 L 70 350 L 140 275 L 105 285 L 170 205 L 145 215 Z"
            fill="url(#green-branches)"
            className="branch branch-middle"
          />

          <path
            d="M 200 225 L 275 325 L 245 315 L 345 405 L 55 405 L 155 315 L 125 325 Z"
            fill="url(#green-branches)"
            className="branch branch-bottom"
          />
        </g>

        <path
          d="M 200 5 L 210 27 L 234 29 L 216 45 L 221 68 L 200 56 L 179 68 L 184 45 L 166 29 L 190 27 Z"
          fill="#ffdc7a"
          stroke="#fff1bd"
          strokeWidth="2"
          className="tree-star"
        />

        <Garland enabled={garlandEnabled} variant={isWhite ? "white" : "green"} />
      </svg>

      {decorations.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`tree-decoration decoration-${item.type}`}
          style={{
            left: `${(item.x / 400) * 100}%`,
            top: `${(item.y / 520) * 100}%`,
            color: decorationColors[item.type],
          }}
          onPointerDown={(event) =>
            onDecorationPointerDown?.(event, item)
          }
          aria-label="Украшение ёлки"
        >
          {decorationSymbols[item.type]}
        </button>
      ))}
    </div>
  );
}
