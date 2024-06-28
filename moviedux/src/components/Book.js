import React, { useState, useEffect } from "react";
import "../styles.css";

export default function Book() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const m = ["x", "dd", "assesdww", "eeeee"];
    setBooks(m);
  }, []);
  return (
    <ul className="header">
      {books.map((book) => (
        <li>{book}</li>
      ))}
    </ul>
  );
}
