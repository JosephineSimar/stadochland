"use strict";
//json som sparar ibockade städer till localStorage

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
    console.log("städer skrivs ut för land: ", landdata.countryname);
    for(let j=0; j<staddata.length; j++){
        if(staddata[j].countryid === landdata.id){
            var city = document.createElement('li');
            cityList.appendChild(city);
            city.insertAdjacentHTML('beforeend', staddata[j].stadname);
            city.addEventListener('click', function(){
                 printInfo(staddata[j]);
                 console.log("klick på staden");
            });
        }
        
    }
}

//funktion som anropas vid klick på stadsnamn, skriver ut info i infoContent-diven
//har även en ruta som kan klickas i
function printInfo(staddata){
    console.log("skriver ut info om: ", staddata.stadname)


}

//funktion som sparar data om staden vars ruta klickats i och lagrar infon i en array i localStorage


//funktion som skriver ut alla besökta städer från localStorage
    
//funktion som rensar de sparade städerna i localStorage
function clearLs()
{
    console.log("data rensas");
}