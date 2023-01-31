import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_GENRES, GET_MOVIES } from "../queries";
import { MovieContext } from "../context/MovieContext";
import CardCSS from "../assets/styles/components/Card.module.scss";
import MoviesPageCSS from "../assets/styles/pages/MoviesPage.module.scss";
import { useForm } from "../util/hooks";
import Card from "../components/Card";
import Button from "../components/Button";
import DropdownFilter from "../components/DropdownFilter";
import classnames from "classnames";

const MoviesPage = () => {
  const navigate = useNavigate();
  let { page } = useParams();
  page = Number(page);
  const mc = useContext(MovieContext);

  const { onChange, values } = useForm({
    genre: "",
  });

  const getGenres = useQuery(GET_GENRES);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (getGenres.data) {
      setGenres(getGenres.data.getGenres);
    }
  }, [getGenres.data]);

  const [getMovies, MoviesQuery] = useLazyQuery(GET_MOVIES, {
    variables: {
      apiInput: {
        list: mc.movie,
        genre: values.genre,
        page: page,
      },
    },
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
    if (MoviesQuery.data) {
      setMovies(MoviesQuery.data.getMovies);
    }
  }, [MoviesQuery.data]); // eslint-disable-line

  const changePage = (v) => {
    navigate(`/movies/${page + v}`);
  };

  const handleSelect = (event) => {
    let siblings = [].filter.call(
      event.target.parentNode.children,
      (child) => child !== event.target
    );
    siblings.map((sibling) => {
      sibling.className = "";
      return sibling;
    });

    onChange(event);
    changePage(-page + 1); //back to the first page on the new genre
    getMovies();
  };

  if (MoviesQuery.loading) {
    return <div>...loading</div>;
  }
  return (
    <div className={MoviesPageCSS.container}>
      <DropdownFilter
        name={"Genre"}
        list={genres}
        handleSelect={handleSelect}
        value={values.genre}
      />
      <div className={classnames(CardCSS.container, MoviesPageCSS.cards)}>
        {movies.length === 0 ? (
          <h3>No results</h3>
        ) : (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
      </div>
      <div className={MoviesPageCSS.buttons}>
        {page === 1 ? (
          <></>
        ) : (
          movies.length === 20 && (
            <Button
              name={"Back"}
              handleClick={() => changePage(-1)}
              direction={"buttonLeft"}
            />
          )
        )}
        {movies.length === 20 && (
          <>
            <Button
              name={"Next"}
              handleClick={() => changePage(1)}
              direction={"buttonRight"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
