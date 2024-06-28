import React from "react";
import "../styles.css";

export default function Assignment1() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="header">
        <p className="app-subtitle">
          This is p tag with same className app-subtitles
        </p>
        <h2 className="app-subtitle">
          This is h2 tag with same className app-subtitles
        </h2>
      </div>

      <footer className="footer">
        <p className="footer-text">
          © {currentYear} Assugnment, No rights reserved
        </p>
      </footer>
    </>
  );
}
