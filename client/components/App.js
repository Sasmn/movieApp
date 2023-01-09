import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default App;
