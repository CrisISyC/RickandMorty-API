import React from "react";
import "../stylesheets/Header.css"
import { useParams, Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      {/* Logo que recarga la página */}
      <a href="/" className="logo">
        <img src="/logo.png" alt="Logo" />
      </a>

      {/* Navegación */}
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="back-link"> Characters</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
