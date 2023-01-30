import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import CardCSS from "../assets/Card.module.scss";
import PanelCSS from "../assets/Panel.module.scss";

const HomePagePanel = ({ list, cards }) => {
  const navigate = useNavigate();
  const mc = useContext(MovieContext);

  const panelRef = useRef(null);

  const onClick = (m) => {
    mc.setMovie(m);
    navigate("/movies/1");
  };
  return (
    <div className={PanelCSS.panel} ref={panelRef}>
      <div>
        <h2>{list}</h2>
        <button onClick={() => onClick(list)}>More</button>
        <div className={CardCSS.container}>{cards}</div>
      </div>
    </div>
  );
};

export default HomePagePanel;
