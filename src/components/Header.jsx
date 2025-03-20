import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Fichier CSS pour le style

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="logo">
          <Link to="/">ImageBrowser</Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
