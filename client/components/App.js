import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import MoviesPage from "../pages/MoviesPage.js";
import LoginForm from "../pages/LoginForm.js";
import RegisterForm from "../pages/RegisterForm.js";
import Navbar from "./Navbar.js";
import Movie from "../pages/Movie.js";
import AppCSS from "../assets/styles/App.module.scss";

const App = () => {
  return (
    <div className={AppCSS.container}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movies/:page" element={<MoviesPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default App;
