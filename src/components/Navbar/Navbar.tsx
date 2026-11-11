
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NAVBAR_STORAGE_KEY = "winter-navbar-garland";

export default function Navbar() {
  const [isOn, setIsOn] = useState(() => {
    const saved = localStorage.getItem(NAVBAR_STORAGE_KEY);
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem(NAVBAR_STORAGE_KEY, String(isOn));
  }, [isOn]);

  const bulbs = Array.from({ length: 40 }, (_, index) => ({
    x: index * (1000 / 39),
    index,
  }));

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Winter<span>Wonderland</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Главная</Link>
          <Link to="/editor">Редактор</Link>
        </nav>
      </div>

      <div className={`navbar-garland ${isOn ? "is-on" : "is-off"}`}>
        <svg
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          className="navbar-garland-svg"
          aria-hidden="true"
        >
          {/* Основной провод на всю ширину */}
          <path className="navbar-wire" d="M 0 30 H 1000" />

          {/* Лампочки гирлянды */}
          {bulbs.map((bulb) => (
            <g key={bulb.index}>
              <line
                x1={bulb.x}
                y1="30"
                x2={bulb.x}
                y2="37"
                className="navbar-bulb-wire"
              />

              <circle
                cx={bulb.x}
                cy="42"
                r="3.5"
                className="navbar-bulb"
                style={{
                  animationDelay: `${bulb.index * 0.12}s`,
                }}
              />
            </g>
          ))}


        </svg>

        {/* Кнопка и область нажатия — один элемент */}
        <button
          className="navbar-garland-toggle"
          type="button"
          aria-label={isOn ? "Выключить гирлянду" : "Включить гирлянду"}
          title={isOn ? "Выключить гирлянду" : "Включить гирлянду"}
          aria-pressed={isOn}
          onClick={() => setIsOn((prev) => !prev)}
        >
          <span className="navbar-toggle-indicator" />
        </button>
      </div>
    </header>
  );
}
