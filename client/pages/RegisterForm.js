import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../queries";

const RegisterForm = (props) => {
  const context = useContext(AuthContext); //
  let navigate = useNavigate(); //to change the current route
  const [errors, setErrors] = useState([]); //to store the errors sent by the backend

  //the callback function, called when the form is submitted
  const registerUserCallback = () => {
    console.log("Callback hit");
    console.log(values);
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser] = useMutation(CREATE_USER, {
    update(proxy, { data: { createUser: userData } }) {
      //data property: result of the register mutation --> createUser is the name of the object returned in data, and we rename it to userData
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values }, //set the variables to the input datas stored in the values named state
  });

  return (
    <div>
      <h3>Register</h3>
      <p>Sign up</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">username: </label>
        <input
          autoComplete="off"
          name="username"
          id="username"
          value={values.username}
          onChange={onChange}
        />
        <br />
        <label htmlFor="email">email: </label>
        <input
          autoComplete="off"
          name="email"
          id="email"
          value={values.email}
          onChange={onChange}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          autoComplete="off"
          name="password"
          id="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <br />
        <label htmlFor="confirmPassword">confirm password: </label>
        <input
          autoComplete="off"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {errors.map((error) => {
        //missing key prop
        return (
          <div>
            <h2>Error</h2>
            {error.message}
          </div>
        );
      })}
    </div>
  );
};

export default RegisterForm;
