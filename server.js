const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const weatherData = require('./data/weather.json');
const cors = require('cors');

app.use(cors()); // after you initialize your express app instance
// a server endpoint
require('dotenv').config();
const PORT = process.env.PORT;
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World'); // our endpoint function response
  });

app.get('/weather', (req, res) => {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let cityName = req.query.city_name;
  let CityData;

  let Items = weatherData.find(item => {
    if (item.city_name.toLowerCase() === cityName.toLowerCase() && item.lat === latitude && item.lon === longitude){
      CityData = new Forecast(item);
      return item; }
  });
  res.json(CityData);
});


app.listen(PORT); // kick start the express server to work



class Forecast {
  constructor(dataOfWeather) {
    this.data = dataOfWeather.data.map(value =>{
      let description = value.weather.description;
      let date = value.datetime;
      return {description, date};
    });
  }
}
