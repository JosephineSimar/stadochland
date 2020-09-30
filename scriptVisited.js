"use strict";



fetch('stad.json')
    .then(function(response){
        return response.json();
    })
    .then(function(staddata){
        printVisited(staddata);
    });


function printVisited(staddata) {
    //kollar om det finns något i localStorage först
    let savedCitiesJson = localStorage.savedCity;
    if(savedCitiesJson === undefined){
        return;
    }
    let savedCitiesIds = JSON.parse(savedCitiesJson);
    
    let savedCities = staddata.filter(city=>savedCitiesIds.includes(city.id));
    for(let i=0; i<savedCities.length; i++){
        document.getElementById('stats').insertAdjacentHTML('beforeend', savedCities[i].stadname+'<br/>')
    }
    let people = 0;
    for(let j=0; j<savedCities.length; j++){
        people = people + savedCities[j].population;
    }
    if(savedCities.length > 0) //skriver inte ut om listan är tom
        document.getElementById('stats').insertAdjacentHTML('beforeend', '<br/>' + 'Du har haft möjlighet att träffa totalt ' + people + ' lokala stadsbor under dina resor.' );
}


function clearLs()
{
    console.log("data rensas");
    localStorage.removeItem('savedCity');
    document.getElementById('stats').innerHTML='';
    
}