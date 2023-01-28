import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MOVIE } from "../queries";
import MoviepageCSS from "../assets/Moviepage.module.scss";
import missingPoster from "../assets/missing_poster.jpg";

const Movie = () => {
  let { id } = useParams();

  const getMovie = useQuery(GET_MOVIE, {
    variables: {
      id: id,
    },
  });

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (getMovie.data) {
      setMovie(getMovie.data.getMovie);
    }
  }, [getMovie.data]);

  return (
    <div>
      <h3>{movie.title}</h3>
      <img
        className={MoviepageCSS.img}
        src={movie.img}
        onError={({ target }) => {
          if (target.src !== missingPoster) {
            target.onerror = null;
            target.src = missingPoster;
          } else {
            target.src = "";
          }
        }}
        alt=""
      />
    </div>
  );
};

export default Movie;
