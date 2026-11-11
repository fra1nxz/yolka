import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";

import Snow from "../../components/Snow/Snow";
import ChristmasTree from "../../components/ChristmasTree/ChristmasTree";
import DecorationPanel from "../../components/DecorationPanel/DecorationPanel";

import { trees } from "../../data/trees";
import { decorations } from "../../data/decorations";

import { useTreeState } from "../../hooks/useTreeState";

import type {
  Decoration,
  DecorationType,
  TreeId,
} from "../../types/tree";

import "./Editor.css";

type DragState = {
  source: "palette" | "tree";
  type: DecorationType;
  id?: string;
  clientX: number;
  clientY: number;
};

const treePolygon = [
  [200, 20],
  [270, 130],
  [235, 130],
  [320, 260],
  [265, 260],
  [375, 410],
  [25, 410],
  [135, 260],
  [80, 260],
  [165, 130],
  [130, 130],
];

function isInsideTree(x: number, y: number) {
  let inside = false;

  for (
    let i = 0, j = treePolygon.length - 1;
    i < treePolygon.length;
    j = i++
  ) {
    const [xi, yi] = treePolygon[i];
    const [xj, yj] = treePolygon[j];

    const intersects =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

export default function Editor() {
  const { state, setState } = useTreeState();

  const treeRef = useRef<HTMLDivElement>(null);

  const [drag, setDrag] = useState<DragState | null>(null);

  const selectedTree = state.selectedTree;

  const currentDecorations =
    state.decorations[selectedTree] ?? [];

  const currentGarland = state.garland[selectedTree];

  const updateDecoration = (decoration: Decoration) => {
    setState((prev) => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        [selectedTree]: [
          ...prev.decorations[selectedTree].filter(
            (item) => item.id !== decoration.id
          ),
          decoration,
        ],
      },
    }));
  };

  const removeDecoration = (id: string) => {
    setState((prev) => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        [selectedTree]: prev.decorations[selectedTree].filter(
          (item) => item.id !== id
        ),
      },
    }));
  };

  const startPaletteDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    type: DecorationType
  ) => {
    event.preventDefault();

    setDrag({
      source: "palette",
      type,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const startTreeDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    item: Decoration
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setDrag({
      source: "tree",
      type: item.type,
      id: item.id,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  useEffect(() => {
    if (!drag) return;

    const handleMove = (event: PointerEvent) => {
      setDrag((prev) =>
        prev
          ? {
            ...prev,
            clientX: event.clientX,
            clientY: event.clientY,
          }
          : null
      );
    };

    const handleUp = (event: PointerEvent) => {
      const rect = treeRef.current?.getBoundingClientRect();

      if (rect) {
        const x = ((event.clientX - rect.left) / rect.width) * 400;
        const y = ((event.clientY - rect.top) / rect.height) * 520;

        const inside =
          x >= 0 &&
          x <= 400 &&
          y >= 0 &&
          y <= 520 &&
          isInsideTree(x, y);

        if (inside) {
          if (drag.source === "palette") {
            const newDecoration: Decoration = {
              id: crypto.randomUUID(),
              type: drag.type,
              x,
              y,
            };

            updateDecoration(newDecoration);
          } else if (drag.id) {
            updateDecoration({
              id: drag.id,
              type: drag.type,
              x,
              y,
            });
          }
        } else if (drag.source === "tree" && drag.id) {
          removeDecoration(drag.id);
        }
      }

      setDrag(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [drag, selectedTree, setState]);

  const toggleGarland = () => {
    setState((prev) => ({
      ...prev,
      garland: {
        ...prev.garland,
        [selectedTree]: !prev.garland[selectedTree],
      },
    }));
  };

  const changeTree = (id: TreeId) => {
    setState((prev) => ({
      ...prev,
      selectedTree: id,
    }));
  };

  const activeDecoration = drag
    ? decorations.find((item) => item.type === drag.type)
    : null;

  return (
    <main className="editor-page">
      <Snow />

      <header className="editor-header">
        <Link to="/" className="back-link">
          ← На главную
        </Link>

        <h1>Моя новогодняя ёлка</h1>

        <button
          className={`garland-toggle ${currentGarland ? "active" : ""}`}
          onClick={toggleGarland}
        >
          {currentGarland ? "Гирлянда включена" : "Включить гирлянду"}
        </button>
      </header>

      <section className="editor-layout">
        <aside className="tree-selector">
          <h2>Выбери ёлку</h2>

          {trees.map((tree) => (
            <button
              key={tree.id}
              className={`tree-choice ${selectedTree === tree.id ? "selected" : ""
                }`}
              onClick={() => changeTree(tree.id)}
            >
              <span
                className="tree-choice-icon"
                style={{ color: tree.color }}
              >
                ▲
              </span>

              <span>
                <strong>{tree.name}</strong>
                <small>{tree.description}</small>
              </span>
            </button>
          ))}
        </aside>

        <div className="editor-center">
          <ChristmasTree
            treeId={selectedTree}
            decorations={currentDecorations}
            garlandEnabled={currentGarland}
            treeRef={treeRef}
            onDecorationPointerDown={startTreeDrag}
          />

          <p className="editor-hint">
            Перетаскивай украшения на ёлку. Чтобы убрать игрушку,
            перетащи её за пределы ёлки.
          </p>
        </div>

        <DecorationPanel onDragStart={startPaletteDrag} />
      </section>

      {drag && activeDecoration && (
        <div
          className="drag-preview"
          style={{
            left: drag.clientX,
            top: drag.clientY,
            color: activeDecoration.color,
          }}
        >
          {activeDecoration.symbol}
        </div>
      )}
    </main>
  );
}