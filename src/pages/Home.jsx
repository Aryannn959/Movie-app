import { useEffect, useState, useRef } from "react";
import "./Home.css";
import getMovies from "../utils/getMovies.js";
import MovieCard from "../components/MovieCard.jsx";
import searchMovie from "../utils/searchMovie.js";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard.jsx";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedMovie, setSearchedMovie] = useState("");

  const debounceRef = useRef(null);

  // 🔥 Single reusable function
  async function loadMovies(pageNum = 1) {
    try {
      setLoading(true);
      const data = await getMovies(pageNum);
      setMovies(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // 👉 Load movies when page changes (ONLY if not searching)
  useEffect(() => {
    if (!searchedMovie.trim()) {
      loadMovies(page);
    }
  }, [page]);

  // 👉 Search logic with debounce
  useEffect(() => {
    if (!searchedMovie.trim()) {
      loadMovies(page); // reset to current page
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchMovie(searchedMovie);
        setMovies(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchedMovie]);

  return (
    <div className="home">
      {/* 🔍 Search */}
      <div className="search-container">
        <input
          className="search-movie"
          type="text"
          value={searchedMovie}
          onChange={(e) => setSearchedMovie(e.target.value)}
          placeholder="Search movies..."
        />
      </div>

      <Link to="/favourites">GoToFav</Link>

      {/* 🎬 Movies Grid */}
      <div className="movies-grid">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        ) : movies.length === 0 ? (
          <h2>No movies found 😢</h2>
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
        )}
      </div>

      {/* 📄 Pagination (only when NOT searching) */}
      {!searchedMovie.trim() && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
