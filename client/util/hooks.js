import { useState } from "react";

//az initialState alapvetően üres object, de lehet definiálni az adott componentben
export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    if (event.target.nodeName === "INPUT") {
      setValues({ ...values, [event.target.name]: event.target.value }); // a target name-je lesz a state objecten belül a neve, és a value-ja a state object-en belül az értéke
    } else {
      setValues({
        ...values,
        [event.target.getAttribute("name")]: event.target.innerText,
      });
    }
    console.log(values); //le van maradva 1-el, de ez nem probléma
  };

  const onSubmit = (event) => {
    event.preventDefault(); //a default submit action megakadályozása
    callback(); // itt hívunk meg minden mást
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
