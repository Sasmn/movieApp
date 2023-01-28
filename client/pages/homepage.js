import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLazyQuery } from "@apollo/client";
import { GET_GENRES } from "../queries";

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Homepage</h1>

      {user ? (
        <>
          <h2>
            Welcome{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "fuchsia",
              }}
            >
              {user.username}
            </span>
            . You are logged in.
          </h2>
        </>
      ) : (
        <>
          <p>There's no user.</p>
        </>
      )}
    </div>
  );
};

export default Homepage;
