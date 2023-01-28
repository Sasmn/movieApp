import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries";
import uniqid from "uniqid";

const MoviesPage = () => {
  const { error, loading, data } = useQuery(GET_GENRES);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (data) {
      setGenres(data.getGenres);
    }
  }, [data]);

  return (
    <div>
      {genres.map((genre) => (
        <p key={uniqid()}>{genre.description}</p>
      ))}
    </div>
  );
};

export default MoviesPage;
