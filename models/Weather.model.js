class Weather {
  constructor(weatherData) {
    this.description = `Low temp is : ${weatherData.low_temp}, Max temp is : ${weatherData.max_temp}, ${weatherData.weather.description}`;
    this.date = weatherData.valid_date;
  }
}

module.exports = Weather;
