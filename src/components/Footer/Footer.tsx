import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="footer-logo">
          Winter Wonderland
        </Link>

        <p className="footer-description">
          Создай свою атмосферу новогоднего волшебства.
        </p>

        <nav className="footer-links">
          <Link to="/">Главная</Link>
          <Link to="/editor">Редактор ёлки</Link>
        </nav>

        <span className="footer-copyright">
          © 2026 Winter Wonderland
        </span>
      </div>
    </footer>
  );
}