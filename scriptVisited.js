"use strict";


printVisited();

function printVisited() {
    //kollar om det finns något i localStorage först
    let savedCitiesJson = localStorage.savedCity;
    if(savedCitiesJson === undefined){
        return;
    }
    let savedCities = JSON.parse(savedCitiesJson);
    for(let i=0; i<savedCities.length; i++){
        document.getElementById('stats').insertAdjacentHTML('beforeend', savedCities[i].stadname+'<br/>')
    }
    let people = 0;
    for(let j=0; j<savedCities.length; j++){
        people = people + savedCities[j].population;
    }
    document.getElementById('stats').insertAdjacentHTML('beforeend', '<br/>' + 'Du har haft möjlighet att träffa totalt ' + people + ' lokala stadsbor under dina resor.' );
}


function clearLs()
{
    console.log("data rensas");
    localStorage.removeItem('savedCity');
    document.getElementById('stats').innerHTML='';
    
}