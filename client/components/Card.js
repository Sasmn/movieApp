import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CardCSS from "../assets/Card.module.scss";
import missingPoster from "../assets/missing_poster.jpg";
import { rotateCard, rotateCardBack } from "Utilities/rotateCard";

const HomePagePanel = ({ movie }) => {
  const navigate = useNavigate();
  const onCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const cardRef = useRef(null);
  return (
    <div
      ref={cardRef}
      className={CardCSS.card}
      onMouseMove={(e) =>
        rotateCard({ card: cardRef.current, e: e, id: movie.id })
      }
      onMouseLeave={(e) => rotateCardBack({ card: cardRef.current })}
    >
      <div>
        <h4 className={CardCSS.title}>{movie.title}</h4>
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
        <div className={CardCSS.innerBorder}></div>
      </div>
    </div>
  );
};

export default HomePagePanel;
