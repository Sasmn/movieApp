import React from "react";
import uniqid from "uniqid";
import DropdownCSS from "../assets/styles/components/Dropdown.module.scss";

const DropDownFilter = ({ handleSelect, list, value, name }) => {
  return (
    <div className={DropdownCSS.container}>
      <h4 className={DropdownCSS.title}>{name + ":"}</h4>
      <div>
        <div className={DropdownCSS.button}>
          <div>{value ? value : "choose one"}</div>
          <ul className={DropdownCSS.list}>
            {list.map((element) => (
              <li
                key={uniqid()}
                className={
                  element.description === value
                    ? DropdownCSS.selected
                    : DropdownCSS.notSelected
                }
                name="genre"
                onClick={(e) => handleSelect(e)}
              >
                {element.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDownFilter;
