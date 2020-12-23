// Intializing global variables to store latitude and longitude
// which can used for other functions
window.lat = null;
window.lng = null;

// Intializing object to store values for updating Ui
window.uiData = {};

// Primary function from which user datas are retrieved and to call api's
function performFunction(event) {
  event.preventDefault();

  // user inputs
  let arrival_city = document.getElementById("arrival_city").value;
  let city = document.getElementById("city").value;
  let date = document.getElementById("date").value;
  let re_date = document.getElementById("re_date").value;
  let loader = document.getElementById("load");
  let containBox = setTimeout(showPage, 3000); // call showpage() when all api data's are retrieved
  let container = document.getElementById("container");
  let error = document.getElementById("error");

  // Validating all fields
  if (arrival_city == "" || city == "" || date == "" || re_date == "") {
    error.innerHTML = "Enter the details in all field";
  }
  // when all details entered, make a call to api
  else {
    // fetching country information
    fetch(`http://localhost:5000/country?q=${city}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        loader.classList.add("loader");
        container.classList.add("box");
        uiData["dept_city"] = city;
        uiData["country"] = data.geonames[0].countryName;
        uiData["arrival_city"] = arrival_city;
        uiData["dept_date"] = date;
        uiData["re_date"] = re_date;
        // passing datas through function
        callWeatherAPI(data.geonames[0].lat, data.geonames[0].lng);
        lat = data.geonames[0].lat;
        lng = data.geonames[0].lng;
        callImage(city);
        calculateDays();
        uiUpdate();
      });
  }
}

// function to fetch daily weathers
function callWeatherAPI(lat, lng) {
  fetch(`http://localhost:5000/dailyWeather?lat=${lat}&lon=${lng}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      uiData["icon"] = data.data[0].weather.icon;
      uiData["high"] = data.data[0].high_temp;
      uiData["low"] = data.data[0].low_temp;
      uiData["description"] = data.data[0].weather.description;
      uiUpdate();
    });
}

// fetch images related to city
function callImage(city) {
  fetch(`http://localhost:5000/image?q=${city}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      uiData["image"] = data.hits[0].webformatURL;
    });
}

// calculateDays function
function calculateDays() {
  console.log(lat);
  console.log(lng);
  let today = new Date();
  let date1 = document.getElementById("date").valueAsNumber;
  let date2 = document.getElementById("re_date").valueAsNumber;

  // Calculate the time difference
  let difference_in_time = date1 - today.getTime();
  let dif_in_time = date2 - date1;

  // Calculate no.of days away for trip
  let difference_in_days = Math.ceil(difference_in_time / (1000 * 3600 * 24));
  //calculate duration of trip
  let dif_in_days = Math.ceil(dif_in_time / (1000 * 3600 * 24));
  uiData["dDay1"] = difference_in_days;
  uiData["dDay2"] = dif_in_days;
}

// function for forecast weather data
function addForecast(event) {
  event.preventDefault();
  console.log("called");
  let lats = lat;
  let lon = lng;
  forecastData(lats, lon);
  function forecastData(lat, lng) {
    let forecast = document.getElementById("forecast");
    let fore_details = [];
    fetch(`http://localhost:5000/dailyWeather?lat=${lat}&lon=${lng}`)
      .then((res) => {
        const weatherData = res.json();
        return weatherData;
      })
      .then((weatherData) => {
        console.log(weatherData);
        for (let i of weatherData.data) {
          fore_details.push(
            `<li> <img src="https://www.weatherbit.io/static/img/icons/${i.weather.icon}.png" width="30px" height="30px" alt="Weather icon"> 
          <strong>${i.valid_date}</strong>, 
          High: ${i.high_temp} F | Low: ${i.low_temp} F </li> `
          );
        }
        forecast.innerHTML = fore_details.join("");
      });
  }
}

// function to add loader when api data's are rendering
function showPage() {
  document.getElementById("load").style.display = "none";
  document.getElementById("container").style.display = "block";
}

// Update UI
function uiUpdate() {
  // updating tripdetails got from user
  let tripDetails = `<strong>TRIP DETAILS:</strong> <br>
  <strong>My trip to: </strong> ${uiData.dept_city}, ${uiData.country} <br>
  <strong> Arrival at: </strong>  ${uiData.arrival_city} <br>
  <strong>Departure date: </strong> ${uiData.dept_date} <br>
  <strong>Return date: </strong>${uiData.re_date} `;
  document.getElementById("tripDetails").innerHTML = tripDetails;
  // image rendered for the city user entered
  document.getElementById(
    "image"
  ).innerHTML = `<img src=${uiData.image} width="250px" height="250px" alt="City image">`;
  // duration of days of trip
  let duration = `<strong>Duration: </strong> ${uiData.dDay1} days. <br>
  Your trip is ${uiData.dDay2} days away.`;
  document.getElementById("duration").innerHTML = duration;
  // displaying currentweather details for user
  let currentWeather = `<strong>Current weather details: </strong> <br>
                        <img src="https://www.weatherbit.io/static/img/icons/${uiData.icon}.png" width="30px" height="30px" alt="Weather icon"> 
                        High: ${uiData.high} F | Low: ${uiData.low} F, 
                        Mostly ${uiData.description} throughtout the day`;
  document.getElementById("currentWeather").innerHTML = currentWeather;
  // Additionally added Flight details
  document.getElementById(
    "flightButton"
  ).innerHTML = `<button class="btn" onclick="return Client.AddFlight(event)"
onsubmit="return AddFlight(event)">ADD FLIGHTS</button>`;
  // Additionally displaying weather details of 16 days for user
  document.getElementById(
    "weatherButton"
  ).innerHTML = `<button class="btn" onclick="return Client.addForecast(event)"
onsubmit="return addForecast(event)">CHECK WEATHER(16 days)</button>`;
}

export { performFunction, addForecast };
