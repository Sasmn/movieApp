import React from "react";
import { useNavigate } from "react-router-dom";
import CardCSS from "../assets/Card.module.scss";
import missingPoster from "../assets/missing_poster.jpg";

const HomePagePanel = ({ movie }) => {
  const navigate = useNavigate();
  const onCardClick = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className={CardCSS.card}>
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
};

export default HomePagePanel;
