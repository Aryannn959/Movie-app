import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/movieContext.js";
import "./Favourites.css";

function Favourites() {
  const { favouriteMovies } = useMovieContext();
  return (
    <div className="fav-movies">
      <h2>Favourite Movies</h2>
      <h2>Favorites ({favouriteMovies.length})</h2>
      <Link className="back-link" to={"/"}>← Back to Home</Link>
      <div className="fav-movies-grid">
        {favouriteMovies.length === 0 ? (
          <p>No favourite movies yet 😢</p>
        ) : (
          favouriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default Favourites;
