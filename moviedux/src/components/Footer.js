import React from "react";
import "../styles.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    // <div className="footer">
    //   <img className="logo" src="logo.png" alt="moviedux"></img>
    //   <h2 className="app-subtitle">Footer block here H2 tag</h2>
    // </div>
    <footer className="footer">
      <p className="footer-text">
        © {currentYear} Moviedux, All rights reserved
      </p>
    </footer>
  );
}
