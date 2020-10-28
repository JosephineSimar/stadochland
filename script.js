"use strict";
//Skapar json där ibockade städer sedan kan fyllas på
let savedCities = [];

//Fetch som hämtar json-filerna med länder och städer
fetch("http://127.0.0.1:3000/land")
  .then(function (response) {
    return response.json();
  })
  .then(function (landdata) {
    fetch("http://127.0.0.1:3000/stad")
      .then(function (response) {
        return response.json();
      })
      .then(function (staddata) {
        readLocalStorage();
        printMenu(landdata, staddata);
      });
  });

//Funktion som skriver ut länderna till en menyrad och gör dem klickbara
function printMenu(landdata, staddata) {
  for (let i = 0; i < landdata.length; i++) {
    let land = document.createElement("li");
    land.setAttribute("id", "landMenu");
    menu.insertAdjacentElement("afterbegin", land);
    land.insertAdjacentHTML("beforeend", landdata[i].countryname);
    land.addEventListener("click", function () {
      printCities(landdata[i], staddata);
    });
  }
}

//Funktion som anropas vid klick på landsnamn i menyn, skriver ut landets städer i cityList och gör varje stad klickbar
function printCities(landdata, staddata) {
  document.getElementById("cityList").innerHTML = "";
  document.getElementById("fact").innerHTML = "";
  document.getElementById("headline").innerHTML =
    "Klicka på en stad för att se läsa om den";
  for (let j = 0; j < staddata.length; j++) {
    if (staddata[j].countryid === landdata.id) {
      let city = document.createElement("li");
      city.setAttribute("id", "cityMenu");
      cityList.appendChild(city);
      city.insertAdjacentHTML("beforeend", staddata[j].stadname);
      city.addEventListener("click", function () {
        printInfo(staddata[j], landdata);
      });
    }
  }
}

//Funktion som anropas vid klick på stadsnamn, skriver ut info i "fact" och skapar en knapp som går att bocka i
function printInfo(staddata, landdata) {
  document.getElementById("fact").innerHTML =
    staddata.stadname +
    " är en stad i " +
    landdata.countryname +
    " där det bor " +
    staddata.population +
    " personer." +
    "<br/>" +
    "Jag har besökt " +
    staddata.stadname;
  let visitedBtn = document.createElement("INPUT");
  fact.appendChild(visitedBtn);
  visitedBtn.setAttribute("type", "checkbox");
  //Här kontrolleras om den aktuella staden redan har sparats till localStorage så att man inte ska kunna trycka på samma stad fler än en gång, om den finns är rutan förbockad
  if (cityExists(staddata.id)) {
    visitedBtn.checked = true;
  }
  visitedBtn.addEventListener("click", function () {
    cityClicked(visitedBtn, staddata);
  });
}

//Funktion som sparar stadens id och lagrar infon i en array som sparas i localStorage
function cityClicked(visitedBtn, cityFact) {
  //Om en rutan klickas i flera gånger sparas inte stadens id i "savedCities" ännu en gång
  if (visitedBtn.checked) {
    if (cityExists(cityFact.id)) {
      return;
    }
    //Den ibockade stadens id läggs till i "savedCities"
    savedCities.push(cityFact.id);
  }
  //När man klickar ur en stads ruta tas stadens id bort från "savedCities" som sen sparas i localStorage på nytt
  else {
    savedCities = savedCities.filter((id) => id !== cityFact.id);
  }
  //"savedCitites" görs till en sträng som sedan sparas i localStorage
  let cityString = JSON.stringify(savedCities);
  localStorage.setItem("savedCity", cityString);
}

//Funktion som kontrollerar om en stad vars ruta bockas i redan finns sparad i listan "savedCities" eller inte
function cityExists(id) {
  let found = false;
  for (var i = 0; i < savedCities.length; i++) {
    if (savedCities[i] == id) {
      found = true;
      break;
    }
  }
  return found;
}

//Funktion som kollar vad som finns i localStorage och gör strängen till json
function readLocalStorage() {
  let savedCitiesJson = localStorage.savedCity;
  if (savedCitiesJson !== undefined) {
    savedCities = JSON.parse(savedCitiesJson);
  }
}
