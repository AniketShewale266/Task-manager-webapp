import React from "react";
import '../App.css'

function Header() {
  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <h2 className="title">
            <a href="/" className="header-text">
              Task Manager
            </a>
          </h2>
        </div>
      </header>
    </>
  );
}

export default Header;
