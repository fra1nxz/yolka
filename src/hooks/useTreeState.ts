import { useEffect, useState } from "react";
import type { EditorState } from "../types/tree";

const STORAGE_KEY = "winter-tree-editor";

function getDefaultPosition() {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const isMobile = window.innerWidth <= 700;

  return {
    x: Math.max(15, window.innerWidth - (isMobile ? 155 : 220)),
    y: Math.max(100, window.innerHeight - (isMobile ? 240 : 330)),
  };
}

function getDefaultState(): EditorState {
  return {
    selectedTree: "green",

    decorations: {
      green: [],
      white: [],
    },

    garland: {
      green: true,
      white: true,
    },

    navbarGarland: true,
    homeTreePosition: getDefaultPosition(),
  };
}

function loadState(): EditorState {
  const defaults = getDefaultState();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return defaults;

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return defaults;
    }

    return {
      ...defaults,
      ...parsed,

      decorations: {
        ...defaults.decorations,
        ...parsed.decorations,
      },

      garland: {
        ...defaults.garland,
        ...parsed.garland,
      },

      homeTreePosition: {
        ...defaults.homeTreePosition,
        ...parsed.homeTreePosition,
      },
    };
  } catch {
    return defaults;
  }
}

export function useTreeState() {
  const [state, setState] = useState<EditorState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return { state, setState };
}