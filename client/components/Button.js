import React from "react";
import ButtonCSS from "../assets/styles/components/Button.module.scss";
import classnames from "classnames";

const Button = ({ name, handleClick, direction }) => {
  return (
    <div>
      <div
        className={classnames(ButtonCSS.button, ButtonCSS[direction])}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        <div className={ButtonCSS.title}>{name}</div>
      </div>
    </div>
  );
};

export default Button;
