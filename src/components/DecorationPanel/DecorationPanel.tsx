import { decorations } from "../../data/decorations";
import type { DecorationType } from "../../types/tree";
import "./DecorationPanel.css";

type DecorationPanelProps = {
  onDragStart: (
    event: React.PointerEvent<HTMLButtonElement>,
    type: DecorationType
  ) => void;
};

export default function DecorationPanel({
  onDragStart,
}: DecorationPanelProps) {
  return (
    <aside className="decoration-panel">
      <h2>Украшения</h2>
      <p className="panel-description">
        Перетаскивай украшения на ёлку
      </p>

      <div className="decoration-grid">
        {decorations.map((item) => (
          <button
            key={item.type}
            className="decoration-option"
            type="button"
            onPointerDown={(event) => onDragStart(event, item.type)}
          >
            <span style={{ color: item.color }}>
              {item.symbol}
            </span>

            <small>{item.name}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}