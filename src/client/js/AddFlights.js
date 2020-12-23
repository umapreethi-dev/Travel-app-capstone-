// function to get flight details
function AddFlight(event) {
  event.preventDefault();
  let flight = document.getElementById("flight");
  let f_details = [];
  fetch(`http://localhost:5000/flightInfo?`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      for (let i of data.data) {
        f_details.push(
          `<li>
          ${i.airline.name},
          Arrival at: ${i.arrival.airport}, 
          Terminal: ${i.arrival.terminal}, 
          Departure airport: ${i.departure.airport},
          Departure Terminal: ${i.departure.terminal},
          Flight number: ${i.flight.number} <br> </li> `
        );
      }
      flight.innerHTML = f_details.join("");
    });
}

export { AddFlight };
