var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const request = require('request');
const https = require('https');
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/auto', async (req, res) => {
  let userInput = req.query.input;
  axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json' + '?input=' + userInput + '&types=(cities)' + '&key=' + 'AIzaSyALH-QMkp5mwRUbHY00m66i3aF5ZD3V5Vg')
      .then((response) => {
        res.json(response.data);
      })
})

app.get('/getCur', async (req, res) => {
  let loc = req.query.location;
  //console.log(loc);
  const url = 'https://api.tomorrow.io/v4/timelines?apikey=qSiBgRO1bJM1duShNZjTFrnKtua57Z18';
  const options = {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({
      fields: ['temperature', 'humidity', 'windSpeed', 'pressureSeaLevel', 'windDirection'],
      units: 'imperial',
      timesteps: ['1h'],
      location: loc,
      timezone: 'America/Los_Angeles'
    })
  };
  const response = await fetch(url, options);
  const data = await response.json();
  //console.log(data);
  res.json(data);
})

app.get('/get', async (req, res) => {
  let loc = req.query.location;
  //console.log(loc);
  const url = 'https://api.tomorrow.io/v4/timelines?apikey=AXlmNKxmwza8CLBrDmn3jligMJYo7379';
  const options = {
    method: 'POST',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({
      fields: ['temperatureMax', 'temperatureMin', 'windSpeed', 'weatherCode', 'temperatureApparent', 'sunriseTime', 'sunsetTime', 'humidity', 'visibility', 'cloudCover'],
      units: 'metric',
      timesteps: ['1d'],
      location: loc,
      timezone: 'America/Los_Angeles'
    })
  };
  const response = await fetch(url, options);
  const data = await response.json();
  //console.log(data);
  res.json(data);
})

app.listen(5000, (req, res) => {
  console.log('Express API is running at port 5000');
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
