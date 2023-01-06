import { createRoot } from "react-dom/client";
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
