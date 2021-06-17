const axios = require('axios');
const Weather = require('../models/Weather.model');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weatherController =(req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  if (lat && lon) {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.data.data.map(obj => new Weather(obj));
      res.json(responseData);
    }).catch(error => {
      res.send(error.message);
    });
  } else {
    res.send(['You have to provide the correct lon and lat']);
  }
};


module.exports = weatherController;
