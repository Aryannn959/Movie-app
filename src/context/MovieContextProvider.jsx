import { useState } from "react";
import { movieContext } from "./movieContext.js";
export const MovieContextProvider = ({ children }) => {
  const [favouriteMovies, setfavouriteMovies] = useState([]);
  return (
    <movieContext.Provider value={{ favouriteMovies, setfavouriteMovies }}>
      {children}
    </movieContext.Provider>
  );
};
