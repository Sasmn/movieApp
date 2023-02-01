import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import CardCSS from "../assets/styles/components/Card.module.scss";
import PanelCSS from "../assets/styles/components/Panel.module.scss";
import classnames from "classnames";
import Button from "./Button";
import Arrow from "../assets/images/arrow.svg";

const HomePagePanel = ({ list, cList, cards }) => {
  const navigate = useNavigate();
  const mc = useContext(MovieContext);

  const panelRef = useRef(null);

  const onClick = (m) => {
    mc.setMovie(m);
    navigate("/movies/1");
  };
  return (
    <div className={PanelCSS.panel} ref={panelRef}>
      <div className={PanelCSS.container}>
        <h2 className={PanelCSS.title}>{cList}</h2>
        <div className={classnames(CardCSS.container, PanelCSS.cards)}>
          {cards}
        </div>
        <div className={PanelCSS.buttonContainer}>
          <Button
            name={"More"}
            handleClick={() => onClick(list)}
            direction={"buttonRight"}
          />
        </div>
        <div className={PanelCSS.arrowContainer}>
          <img className={PanelCSS.arrow} src={Arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePagePanel;
