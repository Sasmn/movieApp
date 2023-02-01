import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NavbarCSS from "../assets/styles/components/Navbar.module.scss";
import { useForm } from "../util/hooks";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const searchCallback = () => {
    navigate(`/movie/${values.search}`);
  };
  const { onChange, onSubmit, values } = useForm(searchCallback, {
    search: "",
  });
  return (
    <div className={NavbarCSS.container}>
      <Link to="/" className={NavbarCSS.title}>
        Movies
      </Link>
      <form className={NavbarCSS.form} onSubmit={onSubmit} autoComplete="off">
        <input
          className={NavbarCSS.input}
          type="text"
          name="search"
          id="search"
          value={values.search}
          onChange={onChange}
          placeholder="Search by movie ID"
        />
        <Button name="search" handleClick={onSubmit} direction="buttonRight" />
      </form>
      <div className={NavbarCSS.login}>
        {user ? (
          <>
            <h4 className={NavbarCSS.loggedin}>
              <span className={NavbarCSS.username}>{user.username}</span> logged
              in
            </h4>
            <Button
              name="log out"
              handleClick={onLogout}
              direction="buttonLeft"
            />
          </>
        ) : (
          <>
            <Link to="/login" className={NavbarCSS.link}>
              Sign in
            </Link>
            <Link to="/register" className={NavbarCSS.link}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
