import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardCSS from "../assets/Card.module.scss";
import missingPoster from "../assets/missing_poster.jpg";
import { rotateCard, rotateCardBack } from "Utilities/rotateCard";

const Card = ({ movie }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onCardClick = (id) => {
    const newLocation = `/movie/${id}`;
    if (location.pathname !== newLocation) {
      navigate(newLocation);
    }
  };

  const cardRef = useRef(null);

  if (movie.title === undefined) {
    return <div>loading..</div>;
  }
  return (
    <div
      ref={cardRef}
      className={CardCSS.card}
      onMouseMove={(e) =>
        rotateCard({ card: cardRef.current, e: e, id: movie.id })
      }
      onMouseLeave={(e) => rotateCardBack({ card: cardRef.current })}
      onClick={() => onCardClick(movie.id)}
    >
      <div>
        <div className={CardCSS.info}>
          <h4 className={CardCSS.title}>{movie.title}</h4>
          <p className={CardCSS.year}>
            {movie.releaseDate.year ? movie.releaseDate.year : "-"}
          </p>
        </div>
        <img
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
        <div className={CardCSS.innerBorder}></div>
      </div>
    </div>
  );
};

export default Card;
