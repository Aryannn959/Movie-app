async function searchMovie(query) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=cf72c253a76aeff2af16498a17ed4a64&query=${query}`,
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.log("searchMovie error", err);
  }
}
export default searchMovie;
