import uniqid from "uniqid";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../util/hooks";
import { LOGIN_USER } from "../queries";
import FormsCSS from "../assets/Forms.module.scss";
import Button from "../components/Button";

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
    <div className={FormsCSS.container}>
      <p className={FormsCSS.title}>Sign in</p>
      <form onSubmit={onSubmit} className={FormsCSS.form} autocomplete="off">
        <label htmlFor="username" className={FormsCSS.label}>
          username: 
        </label>
        <input
          className={FormsCSS.input}
          name="username"
          id="username"
          value={values.username}
          onChange={onChange}
        />
        <label htmlFor="password" className={FormsCSS.label}>
          password: 
        </label>
        <input
          className={FormsCSS.input}
          name="password"
          id="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
      </form>
      <Button
        className={FormsCSS.button}
        name="log in"
        handleClick={onSubmit}
        direction="buttonRight"
      />
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
