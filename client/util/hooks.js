import { useState } from "react";

//az initialState alapvetően üres object, de lehet definiálni az adott componentben
export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    if (
      event.target.nodeName === "INPUT" ||
      event.target.nodeName === "TEXTAREA"
    ) {
      setValues({ ...values, [event.target.name]: event.target.value }); // a target name-je lesz a state objecten belül a neve, és a value-ja a state object-en belül az értéke
    } else {
      setValues({
        ...values,
        [event.target.getAttribute("name")]: event.target.innerText,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault(); //a default submit action megakadályozása
    callback(); // itt hívunk meg minden mást
    setValues(initialState);
  };

  return {
    onChange,
    onSubmit,
    values,
    setValues,
  };
};
