import type { PointerEvent as ReactPointerEvent } from "react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snow from "../../components/Snow/Snow";
import ChristmasTree from "../../components/ChristmasTree/ChristmasTree";
import { useTreeState } from "../../hooks/useTreeState";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { state, setState } = useTreeState();

  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({
    pointerX: 0,
    pointerY: 0,
    treeX: 0,
    treeY: 0,
    moved: false,
  });

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      treeX: state.homeTreePosition.x,
      treeY: state.homeTreePosition.y,
      moved: false,
    };

    setIsDragging(true);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStart.current.pointerX;
    const deltaY = event.clientY - dragStart.current.pointerY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragStart.current.moved = true;
    }

    if (!dragStart.current.moved) return;

    const treeWidth = 180;
    const treeHeight = 240;

    const maxX = window.innerWidth - treeWidth;
    const maxY = window.innerHeight - treeHeight;

    const x = Math.min(
      maxX,
      Math.max(0, dragStart.current.treeX + deltaX)
    );

    const y = Math.min(
      maxY,
      Math.max(0, dragStart.current.treeY + deltaY)
    );

    setState((prev) => ({
      ...prev,
      homeTreePosition: { x, y },
    }));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (!dragStart.current.moved) {
      navigate("/editor");
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
  };

  return (
    <main className="home-page">
      <Snow />

      <section className="home-content">
        <p className="home-eyebrow">A LITTLE WINTER MAGIC</p>

        <h1>
          Время
          <br />
          <span>чудес</span>
        </h1>

        <p className="home-description">
          Создай свою маленькую зимнюю сказку.
        </p>
      </section>

      <div
        className={`home-tree ${
          isDragging ? "home-tree-dragging" : ""
        }`}
        style={{
          left: `${state.homeTreePosition.x || 0}px`,
          top: `${state.homeTreePosition.y || 0}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <ChristmasTree
          treeId={state.selectedTree}
          decorations={state.decorations[state.selectedTree]}
          garlandEnabled={state.garland[state.selectedTree]}
        />

        <span className="home-tree-hint">
          Нажми, чтобы украсить
        </span>
      </div>
    </main>
  );
}