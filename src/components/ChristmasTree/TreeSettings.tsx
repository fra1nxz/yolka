import "./TreeSettings.css";

type TreeSettingsProps = {
  garland: boolean;
  onToggleGarland: () => void;
  onAddOrnament: () => void;
  onRemoveOrnament: () => void;
};

const TreeSettings = ({
  garland,
  onToggleGarland,
  onAddOrnament,
  onRemoveOrnament,
}: TreeSettingsProps) => {
  return (
    <div
      className="tree-settings"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <h3>Украшения</h3>

      <button onClick={onAddOrnament}>
        + Добавить игрушку
      </button>

      <button onClick={onRemoveOrnament}>
        − Убрать игрушку
      </button>

      <div className="settings-divider" />

      <button onClick={onToggleGarland}>
        {garland ? "Выключить гирлянду" : "Включить гирлянду"}
      </button>

      <p className="settings-hint">
        Перетаскивай ёлку мышкой
      </p>
    </div>
  );
};

export default TreeSettings;