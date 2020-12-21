//document.getElementById("flightInfo").addEventListener("click", AddFlight());

function AddFlight(event) {
  event.preventDefault();

  fetch(`http://localhost:5000/flightInfo?`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById(
        "flight1"
      ).innerHTML = `1. ${data.data[0].airline.name}, 
      Arrival at ${data.data[0].arrival.airport} airport - ${data.data[0].arrival.terminal},
      Departure at ${data.data[0].departure.airport} airport - ${data.data[0].departure.terminal},
      Flight number: ${data.data[0].flight.number}   `;
      document.getElementById(
        "flight2"
      ).innerHTML = `2. ${data.data[1].airline.name}, 
      Arrival at ${data.data[1].arrival.airport} airport - ${data.data[1].arrival.terminal},
      Departure at ${data.data[1].departure.airport} airport - ${data.data[1].departure.terminal},
      Flight number: ${data.data[1].flight.number}   `;
      document.getElementById(
        "flight3"
      ).innerHTML = `3. ${data.data[2].airline.name}, 
      Arrival at ${data.data[2].arrival.airport} airport - ${data.data[2].arrival.terminal},
      Departure at ${data.data[2].departure.airport} airport - ${data.data[2].departure.terminal},
      Flight number: ${data.data[2].flight.number}   `;
    });
}

export { AddFlight };
