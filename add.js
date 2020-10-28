fetch("http://127.0.0.1:3000/land")
  .then(function (response) {
    return response.json();
  })
  .then(function (landdata) {
    let dropdown = document.getElementById("landDropdown");
    for (let i = 0; i < landdata.length; i++) {
      let land = document.createElement("option");
      land.setAttribute("value", landdata[i].id);
      land.innerHTML = landdata[i].countryname;
      dropdown.appendChild(land);
    }
  });

function addCountry(form) {
  console.log(form.land.value);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/land", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      land: form.land.value,
    })
  );
}

function addCity(form) {
  console.log(form.city.value);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/stad", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      city: form.city.value,
      population: form.population.value,
      land: form.landDropdown.value,
    })
  );
}
