// import missingPoster from "../missing_poster.jpg";
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

      // const imageUrl = async (img) => {
      //   let safeUrl;
      //   img === null
      //     ? (safeUrl = missingPoster)
      //     : await axios
      //         .get(img.url)
      //         .then(() => {
      //           safeUrl = img.url;
      //         })
      //         .catch((error) => {
      //           safeUrl = missingPoster;
      //         });

      //   console.log(safeUrl);
      //   return safeUrl;
      // };

      movieLists = movieLists.map((movieList, index) => {
        movieList = movieList.map((movie) => {
          let url;
          movie.primaryImage === null
            ? (url = "")
            : (url = movie.primaryImage.url);
          return {
            id: movie.id,
            title: movie.titleText.text,
            img: url.concat("_V1_FM_UX600_.jpg"),
          };
        });
        return {
          type: lists[index],
          movies: movieList,
        };
      });

      return movieLists;
    },
    getMovies: async (root, { apiInput: { list, genre } }) => {
      let params;
      if (genre === "") {
        params = {
          limit: "20",
          list: list,
        };
      } else {
        params = {
          limit: "20",
          list: list,
          genre: genre,
        };
      }
      let movies;
      const options = {
        method: "GET",
        url: "https://moviesdatabase.p.rapidapi.com/titles",
        params: params,
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          movies = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        });

      let url;
      movies = movies.map((movie) => {
        movie.primaryImage === null
          ? (url = "")
          : (url = movie.primaryImage.url);
        return {
          id: movie.id,
          title: movie.titleText.text,
          img: url.concat("_V1_FM_UX600_.jpg"),
        };
      });
      return movies;
    },
    getMovie: async (root, { id }) => {
      const options = {
        method: "GET",
        url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
        params: {
          info: "mini_info",
        },
        headers: {
          "X-RapidAPI-Key": process.env.IMDB_KEY,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const { data } = await axios(options);
        const movie = data.results;
        console.log(movie);
        let url;
        movie.primaryImage === null
          ? (url = "")
          : (url = movie.primaryImage.url);
        if (movie) {
          return {
            id: movie.id,
            title: movie.titleText.text,
            img: url.concat("_V1_FM_UX600_.jpg"),
          };
        }
      } catch (error) {
        console.error(error);
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

      if (process.env.IMDB_KEY) {
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
      } else {
        console.log("IMDB_KEY not found in the environment variables");
      }

      return genres;
    },
  },
};

module.exports = resolvers;
