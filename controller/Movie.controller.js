const axios = require('axios');
const Movie = require('../models/Movie.model');
require('dotenv').config();
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

const Cache = require('../helper/cache');

const cacheObj = new Cache();

const moviesController = (req, res) => {
  const cityName = req.query.city;
  const requestKey = `movies-${cityName}`;
  if (cityName) {
    if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey].timestamp < 86400000)) {
      res.json(cacheObj[requestKey].data);
    } else {
      const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=${cityName}`;
      axios.get(moviesUrl).then(response => {
        const arrayOfMovies = [];
        const imageUrl = `https://image.tmdb.org/t/p/w500`;
        const responseData = response.data.results.map(obj =>
          new Movie(obj.title, obj.overview, obj.vote_average, obj.vote_count, `${imageUrl}${obj.poster_path}`, obj.popularity, obj.release_date));
        cacheObj[requestKey] = responseData;
        cacheObj[requestKey].timestamp = Date.now();
        arrayOfMovies.push(responseData);
        res.json(arrayOfMovies);
      }).catch(error => {
        res.send(error.message);
      });
    }
  } else {
    res.send(['You have to provide a correct city name']);
  }


};


module.exports = moviesController;
