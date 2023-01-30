import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_INDEX_MOVIES } from "../queries";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";
import fullPageScroll from "Utilities/fullPageScroll";
import Card from "../components/Card";
import HomePagePanel from "Components/HomePagePanel";
import HomepageSCC from "Assets/Homepage.module.scss";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const searchCallback = () => {
    navigate(`/movie/${values.search}`);
  };

  const { onChange, onSubmit, values } = useForm(searchCallback, {
    search: "",
  });

  const [indexMovies, setIndexMovies] = useState([]);
  const [labels, setLabels] = useState([]);

  const { data } = useQuery(GET_INDEX_MOVIES);

  useEffect(() => {
    if (data) {
      setIndexMovies(data.getIndexMovies.map((m) => m.movies));
      setLabels(data.getIndexMovies.map((m) => m.type));
    }
  }, [data]);

  const Panels = () =>
    labels.map((l, i) => {
      const cards = indexMovies[i].map((movie) => (
        <Card key={movie.id} movie={movie} />
      ));
      return <HomePagePanel key={l} list={l} cards={cards} />;
    });

  const panelsRef = useRef(null);
  useEffect(() => {
    if (panelsRef.current) {
      const panelsJSX = panelsRef.current.childNodes;
      if (panelsJSX.length > 0) {
        fullPageScroll(panelsRef.current);
      }
    }
  }, [labels, indexMovies]);

  return (
    <div className={HomepageSCC.container}>
      <h1>Homepage</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search by movie ID: </label>
        <input type="text" name="search" id="search" onChange={onChange} />
        <button type="submit">Search</button>
      </form>

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

      <div ref={panelsRef}>
        <Panels />
      </div>
    </div>
  );
};

export default Homepage;
