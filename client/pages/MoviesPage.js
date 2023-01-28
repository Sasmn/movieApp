import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GENRES, GET_MOVIES } from "../queries";
import uniqid from "uniqid";
import { MovieContext } from "../context/MovieContext";
import CardCSS from "../assets/Card.module.scss";
import missingPoster from "../assets/missing_poster.jpg";


const MoviesPage = () => {
  const navigate = useNavigate();
  const mc = useContext(MovieContext);

  const getGenres = useQuery(GET_GENRES);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (getGenres.data) {
      setGenres(getGenres.data.getGenres);
    }
  }, [getGenres.data]);

  const getMovies = useQuery(GET_MOVIES, {
    variables: {
      apiInput: {
        list: mc.movie,
        genre: "",
      },
    },
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (getMovies.data) {
      setMovies(getMovies.data.getMovies);
    }
  }, [getMovies.data]);

  const onClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <form>
        <ul>
          {genres.map((genre) => (
            <li key={uniqid()}>{genre.description}</li>
          ))}
        </ul>
      </form>
      {movies.map((movie) => (
        <div key={uniqid()}>
          <h4>{movie.title}</h4>
          <img
            className={CardCSS.img}
            onClick={() => onClick(movie.id)}
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
      ))}
    </div>
  );
};

export default MoviesPage;
