$(function(){
    let slideOne = new Slide ("slide_one", "blue", 1);
}); 


$(function(){
    let testingMap = new Map ([51.505, -0.09], 13);
}); 

// let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23"
let url = "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23"

$(function(){
    $.get(url, function (dataStation){
        console.log("Connexion au service JCDecaux !")    
        // .done(function(data) {
            console.log("Récupération des données de la station !");
            console.log(dataStation[0])
            stationNumber = dataStation[0].number;
            stationName = dataStation[0].name;
            stationPosition = dataStation[0].position;
            stationAddress = dataStation[0].address;
            // console.log(stationName)
        // })
        // .fail(function(data) {
            // console.log("Erreur de connexion !")
        // })
        let dataStationOne = new Station(stationNumber, stationName, stationPosition, stationAddress);
    })
});
