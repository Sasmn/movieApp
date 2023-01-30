import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DropdownCSS from "../assets/Dropdown.module.scss";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2 className={DropdownCSS.navbar}>Navbar</h2>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      {user ? (
        <>
          <h4>{user.username} logged in</h4>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
