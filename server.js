const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const port = process.env.PORT || 3000;


const apiKey = process.env.API_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let tempInC= (Number(weather.main.temp) - 32)*5/9;
        let weatherText = `It's ${weather.main.temp} F° (${tempInC.toFixed(1)} C°) in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

/*app.listen(3000, function ()*/
app.listen(port, function () {
  console.log(`Example app listening on ${port}!`)
})
