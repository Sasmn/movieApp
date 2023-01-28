import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_INDEX_MOVIES } from "../queries";
import uniqid from "uniqid";
import CardCSS from "../assets/Card.module.scss";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import missingPoster from "../assets/missing_poster.jpg";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const mc = useContext(MovieContext);

  const navigate = useNavigate();

  const [indexMovies, setIndexMovies] = useState([]);
  const [labels, setLabels] = useState([]);

  const { error, loading, data } = useQuery(GET_INDEX_MOVIES);

  useEffect(() => {
    if (data) {
      setIndexMovies(data.getIndexMovies.map((m) => m.movies));
      setLabels(data.getIndexMovies.map((m) => m.type));
    }
  }, [data]);

  const onClick = (m) => {
    mc.setMovie(m);
    navigate("/movies");
  };

  const onCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <h1>Homepage</h1>

      {user ? (
        <>
          <h2>
            Welcome{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "fuchsia",
              }}
            >
              {user.username}
            </span>
            . You are logged in.
          </h2>
        </>
      ) : (
        <>
          <p>There's no user.</p>
        </>
      )}

      <div>
        {labels.map((m, i) => {
          const cards = indexMovies[i].map((movie) => {
            return (
              <div key={uniqid()}>
                <h4>{movie.title}</h4>
                <img
                  onClick={() => onCardClick(movie.id)}
                  className={CardCSS.img}
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
          });
          return (
            <div key={m}>
              <h2>{m}</h2>
              <button onClick={() => onClick(m)}>More</button>
              {cards}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
