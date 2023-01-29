const axios = require("axios");
require("dotenv").config();

const resolvers = {
  Query: {
    getIndexMovies: async (root) => {
      const listOptions = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles/utils/lists",
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      let lists;
      try {
        const { data } = await axios(listOptions);
        if (data.results) {
          lists = data.results;
        }
      } catch (error) {
        console.error(error);
      }

      let movieLists = [];
      for (const list of lists) {
        const options = {
          method: "GET",
          url: "https://moviesdatabase.p.rapidapi.com/titles",
          params: {
            limit: "4",
            list: list,
          },
          headers: {
            "X-RapidAPI-Key": process.env.IMDB_KEY,
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        };

        try {
          const { data } = await axios(options);
          if (data.results) {
            movieLists.push(data.results);
          }
        } catch (error) {
          console.error(error);
        }
      }

      movieLists = movieLists.map((movieList, index) => {
        movieList = movieList.map((movie) => {
          return movieMini(movie);
        });
        return {
          type: lists[index],
          movies: movieList,
        };
      });

      return movieLists;
    },
    getMovies: async (root, { apiInput }) => {
      if (apiInput.genre === "") delete apiInput.genre;
      let movies;
      const options = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles",
        params: { limit: "20", ...apiInput },
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const { data } = await axios(options);
        movies = data.results;
      } catch (error) {
        console.error(error);
      }

      movies = movies.map((movie) => {
        console.log(movie);
        return movieMini(movie);
      });
      return movies;
    },
    getMovie: async (root, { id }) => {
      const optionsMovie = {
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
        params: {
          info: "base_info",
        },
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      let movie;
      try {
        const { data } = await axios(optionsMovie);
        movie = data.results;
      } catch (error) {
        console.error(error);
      }

      const optionsActors = {
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
        params: {
          info: "extendedCast",
        },
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      let actors;
      try {
        const { data } = await axios(optionsActors);
        actors = data.results;
      } catch (error) {
        console.error(error);
      }
      if (movie && actors) {
        return movieFull(movie, actors);
      }
    },
    getGenres: async (root) => {
      let genres;

      const options = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles/utils/genres",
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const { data } = await axios(options);
        if (data.results) {
          const genresArray = data.results;
          genresArray.shift();
          genres = genresArray.map((genre) => {
            return { description: genre };
          });
        }
      } catch (error) {
        console.error(error);
      }

      return genres;
    },
  },
};

module.exports = resolvers;

const movieFull = (movie, actors) => {
  let movieUrl;
  movie.primaryImage === null
    ? (movieUrl = "")
    : (movieUrl = movie.primaryImage.url);

  return {
    id: movie.id,
    title: movie.titleText.text,
    img: movieUrl.concat("_V1_FM_UX1000_.jpg"),
    genres: movie.genres.genres.map((genre) => {
      return { description: genre.text };
    }),
    rating: {
      score: movie.ratingsSummary.aggregateRating,
      count: movie.ratingsSummary.voteCount,
    },
    releaseDate: {
      day: movie.releaseDate ? movie.releaseDate.day : 0,
      month: movie.releaseDate ? movie.releaseDate.month : 0,
      year: movie.releaseDate ? movie.releaseDate.year : 0,
    },
    length: movie.runtime ? movie.runtime.seconds : 0,
    plot: movie.plot ? movie.plot.plotText.plainText : "",
    actors: actors.cast.edges.map((actor) => {
      let actorUrl;
      actor.node.name.primaryImage === null
        ? (actorUrl = "")
        : (actorUrl = actor.node.name.primaryImage.url);
      return {
        name: actor.node.name.nameText.text,
        img: actorUrl.concat("_V1_FM_UX200_.jpg"),
      };
    }),
  };
};

const movieMini = (movie) => {
  let url;
  movie.primaryImage === null ? (url = "") : (url = movie.primaryImage.url);

  return {
    id: movie.id,
    title: movie.titleText.text,
    img: url.concat("_V1_FM_UX500_.jpg"),
    releaseDate: {
      day: movie.releaseDate ? movie.releaseDate.day : 0,
      month: movie.releaseDate ? movie.releaseDate.month : 0,
      year: movie.releaseDate ? movie.releaseDate.year : 0,
    },
  };
};
