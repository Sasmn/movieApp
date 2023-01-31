import { createRoot } from "react-dom/client";
import React from "react";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import { AuthProvider } from "./context/AuthContext";

import "./assets/styles/index.scss";
import App from "./components/App";
import { MovieProvider } from "./context/MovieContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <MovieProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </BrowserRouter>
      </ApolloProvider>
    </MovieProvider>
  </AuthProvider>
);
