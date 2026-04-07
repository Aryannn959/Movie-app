import { useEffect } from "react";
import { useMovieContext } from "../context/movieContext.js";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const { favouriteMovies, setfavouriteMovies } = useMovieContext();
  const isFav = favouriteMovies.some((m) => m.id === movie.id);

  function toggleFavorite() {
    setfavouriteMovies((prev) => {
      const isFav = prev.some((m) => m.id === movie.id);

      if (isFav) {
        // remove
        return prev.filter((m) => m.id !== movie.id);
      } else {
        // add
        return [...prev, movie];
      }
    });
  }
  // LOAD movies on mount from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fav-movies");

      if (stored) {
        setfavouriteMovies(JSON.parse(stored)); 
      }
    } catch (err) {
      console.log("localStorage fetch error", err);
    }
  }, []);

  // SAVE whenever favorites change to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        "fav-movies",
        JSON.stringify(favouriteMovies), // 
      );
    } catch (err) {
      console.log("localStorage save error", err);
    }
  }, [favouriteMovies]);
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
      <button onClick={toggleFavorite}>{isFav ? "❤️" : "🤍"}</button>
    </div>
  );
}
