import React from "react";
import { useState } from "react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
};

export default LoginForm;
