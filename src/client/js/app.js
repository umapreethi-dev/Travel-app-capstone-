function performFunction(event) {
  event.preventDefault();

  // user inputs
  let arrival_city = document.getElementById("arrival_city").value;
  let city = document.getElementById("city").value;
  let date = document.getElementById("date").value;
  let re_date = document.getElementById("re_date").value;
  let loader = document.getElementById("loader");
  loader.innerHTML = `<img src="media/Spinner-1s-200px.gif" alt="Loading...">`;
  let container = document.getElementById("container");

  // fetching country information
  fetch(`http://localhost:5000/country?q=${city}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      loader.classList.add("hidden");
      container.classList.add("box");
      document.getElementById(
        "country"
      ).innerHTML = `My trip to: ${city}, ${data.geonames[0].countryName} `;
      document.getElementById(
        "arrival"
      ).textContent = `Arrival at: ${arrival_city}`;
      document.getElementById("d_date").textContent = `Departure date: ${date}`;
      document.getElementById("r_date").textContent = `Return date: ${re_date}`;
      document.getElementById(
        "flightButton"
      ).innerHTML = `<button onclick="return Client.AddFlight(event)"
      onsubmit="return AddFlight(event)">Add Flights</button>`;
      callWeatherAPI(data.geonames[0].lat, data.geonames[0].lng);
      callImage(city);
      calculateDays();
      //callRESTAPI(data.geonames[0].countryName);
    });
}

// function to fetch daily weathers
function callWeatherAPI(lat, lng) {
  let latitude = lat;
  let longitude = lng;
  fetch(`http://localhost:5000/dailyWeather?lat=${latitude}&lon=${longitude}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("currentWeather").textContent =
        "Current weather details:";
      document.getElementById(
        "temp"
      ).innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png" width="30px" height="30px" alt="Weather icon"> High: ${data.data[0].high_temp} F | Low: ${data.data[0].low_temp} F`;
      document.getElementById(
        "weather"
      ).innerHTML = `Mostly ${data.data[0].weather.description} throughtout the day`;
      console.log(data);
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
      document.getElementById(
        "image"
      ).innerHTML = `<img src=${data.hits[0].webformatURL} width="250px" height="250px" alt="City image">`;
    });
}

// fetch Country information from REST API
function callRESTAPI(country) {
  fetch(`http://localhost:5000/countryInfo/${country}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function calculateDays() {
  let today = new Date();
  // let currentDate =
  //   today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  let date1 = document.getElementById("date").valueAsNumber;
  let date2 = document.getElementById("re_date").valueAsNumber;

  // Calculate the time difference
  let difference_in_time = date1 - today.getTime();
  let dif_in_time = date2 - date1;

  // Calculate no.of days away for trip
  let difference_in_days = Math.ceil(difference_in_time / (1000 * 3600 * 24));
  //calculate duration of trip
  let dif_in_days = Math.ceil(dif_in_time / (1000 * 3600 * 24));

  document.getElementById(
    "duration"
  ).textContent = `Duration: ${dif_in_days} days.`;

  document.getElementById(
    "day"
  ).textContent = `Your trip is ${difference_in_days} days away.`;
}
//calculateDays();
export { performFunction };
