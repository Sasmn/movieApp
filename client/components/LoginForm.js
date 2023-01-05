import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../queries";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [createUser] = useMutation(CREATE_USER);

  const submit = async (event) => {
    event.preventDefault();

    createUser({ variables: loginData });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          value={loginData.username}
          onChange={({ target }) =>
            setLoginData({ ...loginData, username: target.value })
          }
        />
        <input
          type="password"
          value={loginData.password}
          onChange={({ target }) =>
            setLoginData({ ...loginData, password: target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
