const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const axios = require('axios');
const weatherData = require('./data/weather.json');
const cors = require('cors');
app.use(cors());

require('dotenv').config();


const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World'); // our endpoint function response
  });

app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  if(lat && lon){
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(weatherBitUrl).then(response => {
      const responseData = response.data.data.map(obj => new Forecast(obj));
      res.json(responseData);
    }).catch(error => {
      res.send(error.message);
    });
  } else {
    res.send('please provide the proper lat and lon');
  }
});



class Forecast {
  constructor(weatherData) {
    this.description = `Low temp is : ${weatherData.low_temp}, Max temp is : ${weatherData.max_temp}, ${weatherData.weather.description}`;
    this.date = weatherData.valid_date;
  }
}
app.listen(PORT); // kick start the express server to work
