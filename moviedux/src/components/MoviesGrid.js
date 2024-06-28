import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const filteredGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };
  const filteredRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };
  const filteredSearch = (movie, searchTitle) => {
    return movie.title.toLowerCase().includes(searchTitle.toLowerCase());
  };

  const filteredMovies = movies.filter(
    (movie) =>
      filteredGenre(movie, genre) &&
      filteredRating(movie, rating) &&
      filteredSearch(movie, searchTitle)
  );
  // useEffect(() => {
  //   const m = ["x", "dd", "assesdww", "eeeee"];
  //   setMovies(m);
  // }, []);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="search your movie here ...."
        value={searchTitle}
        onChange={handleSearchTitleChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Fantasy</option>
            <option>Horror</option>
            <option>Drama</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
