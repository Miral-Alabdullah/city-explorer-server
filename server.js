const express = require('express');
const app = express();
const weatherController = require('./controller/Weather.controller');
const moviesController = require('./controller/Movie.controller');
const cors = require('cors');
app.use(cors());

require('dotenv').config();


const PORT = process.env.PORT;

app.get('/',
  function (req, res) {
    res.send('Hello World');
  });







app.get('/movies', moviesController);

app.get('/weather', weatherController);




app.listen(PORT); // kick start the express server to work
