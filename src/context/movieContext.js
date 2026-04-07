import { createContext, useContext } from "react";

export const movieContext = createContext()
export const useMovieContext = ()=>{
    return useContext(movieContext)
}