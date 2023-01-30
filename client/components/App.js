import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import MoviesPage from "../pages/MoviesPage";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import Navbar from "./Navbar";
import Movie from "../pages/Movie";
import AppCSS from "../assets/App.module.scss";

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
