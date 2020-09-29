"use strict";


printVisited();

function printVisited() {
    
    let savedCities = JSON.parse(localStorage.savedCity);
    for(let i=0; i<savedCities.length; i++){
        document.getElementById('stats').insertAdjacentHTML('beforeend', savedCities[i].stadname+'<br/>');

    }
}


function clearLs()
{
    console.log("data rensas");
    localStorage.removeItem("savedCity");
    
}