import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_INDEX_MOVIES } from "../queries";
import fullPageScroll from "Utilities/fullPageScroll";
import Card from "../components/Card";
import HomePagePanel from "Components/HomePagePanel";
import HomepageSCC from "Assets/styles/pages/Homepage.module.scss";

const Homepage = () => {
  const [indexMovies, setIndexMovies] = useState([]);
  const [labels, setLabels] = useState([]);

  const { data, loading } = useQuery(GET_INDEX_MOVIES);

  useEffect(() => {
    if (data) {
      setIndexMovies(data.getIndexMovies.map((m) => m.movies));
      setLabels(data.getIndexMovies.map((m) => m.type));
    }
  }, [data]);

  const correctLabels = [
    "Most popular movies",
    "Most popular series",
    "Top box office ever",
    "Top box office last weekend",
    "Top rated movies",
    "Top rated english movies",
    "Lowest rated",
    "Top rated series",
    "Every movie and TV show",
  ];

  const Panels = () =>
    labels.map((l, i) => {
      const cards = indexMovies[i].map((movie) => (
        <Card key={movie.id} movie={movie} />
      ));
      return (
        <HomePagePanel
          key={l}
          list={l}
          cList={correctLabels[i]}
          cards={cards}
        />
      );
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
      {loading ? (
        <div>loading...</div>
      ) : (
        <div ref={panelsRef}>
          <Panels />
        </div>
      )}
    </div>
  );
};

export default Homepage;
