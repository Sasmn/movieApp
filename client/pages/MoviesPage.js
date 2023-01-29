import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_GENRES, GET_MOVIES } from "../queries";
import uniqid from "uniqid";
import { MovieContext } from "../context/MovieContext";
import CardCSS from "../assets/Card.module.scss";
import DropdownCSS from "../assets/Dropdown.module.scss";
import missingPoster from "../assets/missing_poster.jpg";
import { useForm } from "../util/hooks";

const MoviesPage = () => {
  const navigate = useNavigate();
  let { page } = useParams();
  page = Number(page);
  const mc = useContext(MovieContext);

  const { onChange, onSubmit, values } = useForm({
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

  const onCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const changePage = (v) => {
    navigate(`/movies/${page + v}`);
  };

  const filterByGenre = (event) => {
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

  return (
    <div>
      <form>
        <ul>
          {genres.map((genre) => (
            <li
              key={uniqid()}
              className={
                genre.description === values.genre ? DropdownCSS.selected : ""
              }
              name="genre"
              onClick={(e) => filterByGenre(e)}
            >
              {genre.description}
            </li>
          ))}
        </ul>
      </form>
      <div className={CardCSS.container}>
        {movies.length === 0 ? (
          <h3>No results</h3>
        ) : (
          movies.map((movie) => (
            <div key={uniqid()} className={CardCSS.card}>
              <h4>{movie.title}</h4>
              <img
                className={CardCSS.img}
                onClick={() => onCardClick(movie.id)}
                src={movie.img}
                onError={({ target }) => {
                  if (target.src !== missingPoster) {
                    target.onerror = null;
                    target.src = missingPoster;
                  } else {
                    target.src = "";
                  }
                }}
                alt=""
              />
            </div>
          ))
        )}
      </div>
      <div>
        {page === 1 ? (
          <div></div>
        ) : (
          movies.length === 20 && (
            <button onClick={() => changePage(-1)}>Previous</button>
          )
        )}
        {movies.length === 20 && (
          <button onClick={() => changePage(1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
