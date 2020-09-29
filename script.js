"use strict";
//json som sparar ibockade städer till localStorage
let savedCities = [];
readLocalStorage();

const localStorageCity = 'savedCity';

//fetch som hämtar json-filerna med länder och städer
fetch('land.json')
    .then(function(response){
        return response.json();
    })
    .then(function(landdata){
        console.log("landdata: ", landdata);

        fetch('stad.json')
            .then(function(response){
                return response.json();
            })
            .then(function(staddata){
                console.log("staddata: ", staddata);
                printMenu(landdata,staddata);
                
            })
        })
        

//funktion som skriver ut länderna till en menyrad i head-diven och gör dem klickbara
function printMenu(landdata,staddata){
    console.log("menyn skrivs ut");
    for(let i=0; i<landdata.length; i++){
        let land = document.createElement('li');
        menu.appendChild(land);
        land.insertAdjacentHTML('beforeend', landdata[i].countryname);
        land.addEventListener('click', function(){
            printCities(landdata[i],staddata);
        });
    }
}

//funktion som anropas vid klick på landsnamn, skriver ut landets städer i content-diven
//byter också ut rubriken till klicka på en STAD
function printCities(landdata, staddata){
    document.getElementById('cityList').innerHTML='';
    document.getElementById('fact').innerHTML='';
    document.getElementById('headline').innerHTML='Klicka på en stad för att se läsa om den';
    console.log("städer skrivs ut för land: ", landdata.countryname);
    for(let j=0; j<staddata.length; j++){
        if(staddata[j].countryid === landdata.id){
            var city = document.createElement('li');
            cityList.appendChild(city);
            city.insertAdjacentHTML('beforeend', staddata[j].stadname);
            city.addEventListener('click', function(){
                printInfo(staddata[j], landdata);
                console.log("klick på staden");
            });
        }
    }
}

//funktion som anropas vid klick på stadsnamn, skriver ut info i infoContent-diven
//har även en ruta som kan klickas i
function printInfo(staddata, landdata){
    console.log("skriver ut info om: ", staddata.stadname);
    document.getElementById('fact').innerHTML=staddata.stadname + ' är en stad i ' + landdata.countryname + ' där det bor ' + staddata.population + ' personer.' + '<br/>' + 'Jag har besökt ' + staddata.stadname;
    let visitedBtn = document.createElement('INPUT');
    fact.appendChild(visitedBtn);
    visitedBtn.setAttribute('type', 'checkbox');
    if (cityExists(staddata.stadname)){
        visitedBtn.checked = true;
    }
    visitedBtn.addEventListener('click', function(){
        cityClicked(visitedBtn, staddata);
    });
}

//funktion som sparar data om staden vars ruta klickats i och lagrar infon i en array i localStorage
function cityClicked(visitedBtn, cityFact){
    if(visitedBtn.checked){
        if (cityExists(cityFact.stadname)){
            return;
        }

        let newCity = {
            stadname: cityFact.stadname,
            population: cityFact.population
        };
        savedCities.push(newCity);
        console.log(savedCities);

    }
    else{
        //när man klickar ur ska staden tas bort från savedCities som sen ska sparas i localStorage
    }
    let cityString = JSON.stringify(savedCities);
    localStorage.setItem('savedCity',cityString);
    console.log(localStorage.savedCity);
    
}


function cityExists(cityName){
    let found = false;
    for(var i=0; i<savedCities.length; i++) {
        if (savedCities[i].stadname == cityName) {
            found = true;
            break;
        }
    }
    return found;
}

function readLocalStorage(){
    let savedCitiesJson = localStorage.savedCity;
    if(savedCitiesJson !== undefined){
        savedCities = JSON.parse(savedCitiesJson);
    }
}