// dotenv to hide api keys
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
// Express to run server and routes
const express = require("express");
const fetch = require("node-fetch");

//start up an instance
const app = express();

app.use(express.static("dist"));

/*Dependencies*/
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Local server
const port = 5000;
const server = app.listen(port, () => {
  console.log(`running on localhost:5000`);
});

//Get data
app.get("/", function (req, res) {
  //res.sendFile(path.resolve('src/client/views/index.html'));
  res.sendFile("dist/index.html");
});

//Get data for country
const userName = process.env.user_name;

app.get("/country", async (req, res) => {
  let city = req.query.q;

  let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${userName}`;
  const apiData = await fetch(url, { method: "POST" });
  try {
    const data = await apiData.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

// Get Route for Weather API
const api_key = process.env.weather_API_KEY;

app.get("/dailyWeather", async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${api_key}&days=16`;
  const weatherData = await fetch(weather_url, { method: "POST" });
  try {
    const data = await weatherData.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

// Get Route for Image
const img_api = process.env.image_API_KEY;

app.get("/image", async (req, res) => {
  let city = req.query.q;
  let image_url = `https://pixabay.com/api/?key=${img_api}&q=${city}&image_type=photo`;
  const imageData = await fetch(image_url, { method: "POST" });
  try {
    const data = await imageData.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

// Get Route for FlightInfo

app.get("/flightInfo", async (req, res) => {
  //let country = req.query.country;
  const flight_api = process.env.flight_API_KEY;
  let flight_url = `http://api.aviationstack.com/v1/flights?access_key=${flight_api}&limit=5`;
  const flightData = await fetch(flight_url);
  try {
    const data = await flightData.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = server;
