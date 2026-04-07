async function getMovies(page = 1) {
  try {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=cf72c253a76aeff2af16498a17ed4a64`,
    );
    const data = await apiData.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
}
export default getMovies;
