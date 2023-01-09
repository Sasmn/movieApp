import uniqid from "uniqid";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../util/hooks";
import { LOGIN_USER } from "../queries";

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    console.log("Callback hit");
    console.log(values);
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div>
      <h3>Login</h3>
      <p>Sign in</p>
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
        <button type="submit">Login</button>
      </form>
      {errors.map((error) => {
        return (
          <div key={uniqid()}>
            <h2>Error</h2>
            {error.message}
          </div>
        );
      })}
    </div>
  );
};

export default LoginForm;
