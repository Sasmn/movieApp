import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MOVIE } from "../queries";
import MoviepageCSS from "../assets/Moviepage.module.scss";
import Comments from "Components/Comments";
import Card from "../components/Card";

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

  if (getMovie.loading || movie.title === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div className={MoviepageCSS.container}>
      <div className={MoviepageCSS.movieContainer}>
        <div className={MoviepageCSS.cardContainer}>
          <Card movie={movie} />
        </div>
        <div className={MoviepageCSS.info}>
          <div className={MoviepageCSS.oneInfo}>
            <h4 className={MoviepageCSS.label}>Full title:</h4>
            <p className={MoviepageCSS.description}>{movie.title}</p>
          </div>
          <div className={MoviepageCSS.oneInfo}>
            <h4 className={MoviepageCSS.label}>Rating:</h4>
            <p className={MoviepageCSS.description}>{movie.rating.score}</p>
          </div>
          <div className={MoviepageCSS.oneInfo}>
            <h4 className={MoviepageCSS.label}>Runtime:</h4>
            <p className={MoviepageCSS.description}>
              {movie.length / 60} minutes
            </p>
          </div>
          <div className={MoviepageCSS.oneInfo}>
            <h4 className={MoviepageCSS.label}>Genres:</h4>
            <div className={MoviepageCSS.description}>
              {movie.genres.map((genre) => {
                return (
                  <p key={genre.description} className={MoviepageCSS.genre}>
                    {genre.description}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={MoviepageCSS.oneInfo}>
            <h4 className={MoviepageCSS.label}>Plot:</h4>
            <p className={MoviepageCSS.description}>{movie.plot}</p>
          </div>
        </div>
      </div>
      <Comments movieID={id} />
    </div>
  );
};

export default Movie;
