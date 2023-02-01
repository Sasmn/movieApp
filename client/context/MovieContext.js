import React, { useState, createContext } from "react";

const MovieContext = createContext();

const MovieProvider = (props) => {
  const [movie, setMovie] = useState("most_pop_movies");

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext };
