import { createRoot } from "react-dom/client";
import React from "react";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient";
import { AuthProvider } from "./context/AuthContext";

import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
