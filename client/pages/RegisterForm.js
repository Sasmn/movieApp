import uniqid from "uniqid";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../queries";
import FormsCSS from "../assets/Forms.module.scss";
import Button from "../components/Button";

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
    <div className={FormsCSS.container}>
      <p className={FormsCSS.title}>Sign up</p>
      <form onSubmit={onSubmit} className={FormsCSS.form} autoComplete="off">
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
        <br />
        <label htmlFor="email" className={FormsCSS.label}>
          email:
        </label>
        <input
          className={FormsCSS.input}
          name="email"
          id="email"
          value={values.email}
          onChange={onChange}
        />
        <br />
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
        <br />
        <label htmlFor="confirmPassword" className={FormsCSS.label}>
          confirm password:
        </label>
        <input
          className={FormsCSS.input}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <br />
        <Button
          name="register"
          handleClick={onSubmit}
          direction="buttonRight"
        />
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

export default RegisterForm;
