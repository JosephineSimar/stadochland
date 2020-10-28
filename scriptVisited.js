"use strict";

//Hämtar json för att komma åt staddatan
fetch("http://127.0.0.1:3000/stad")
  .then(function (response) {
    return response.json();
  })
  .then(function (staddata) {
    printVisited(staddata);
  });

//Skriver ut de städer som har bockats i på indexsidan och sparats till localStorage
function printVisited(staddata) {
  //Först kollas om det finns något i localStorage, om inte så körs inte resten av funktionen
  let savedCitiesJson = localStorage.savedCity;
  if (savedCitiesJson === undefined) {
    return;
  }
  let savedCitiesIds = JSON.parse(savedCitiesJson);
  //Här skapas en ny lista med de städer vars id finns sparat i localStorage
  let savedCities = staddata.filter((city) => savedCitiesIds.includes(city.id));
  //Namnen på städerna loopas ut
  for (let i = 0; i < savedCities.length; i++) {
    document
      .getElementById("stats")
      .insertAdjacentHTML("beforeend", savedCities[i].stadname + "<br/>");
  }
  //En variabel för totalt antal personer som bor i de olika städerna skapas
  let people = 0;
  for (let j = 0; j < savedCities.length; j++) {
    people = people + savedCities[j].population;
  }
  //Om listan inte är tom skrivs den här raden ut
  if (savedCities.length > 0)
    document
      .getElementById("stats")
      .insertAdjacentHTML(
        "beforeend",
        "<br/>" +
          "Jag har haft möjlighet att träffa totalt " +
          people +
          " lokala stadsbor under mina resor."
      );
}

//Funktion som tömmer localStorage och skriver över textrutan där besökta städer radas upp så att den blir tom
function clearLs() {
  localStorage.removeItem("savedCity");
  document.getElementById("stats").innerHTML = "";
}
