$(function(){
    let slideOne = new Slide ("slide_one", "blue", 1);
}); 

$(function(){
    let mapOfLyon = new Map ([45.75, 4.85], 13);
});

let url = "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23"
let datasStations = new Station(url);

// mapOfLyon.generateStationMarker()






// let data;

// data =    $.get(url, function (dataStation){
//     //     console.log("Connexion au service JCDecaux !")    
//     //     .done(function(data) {
//             // console.log("Récupération des données de la station 0 !");
//             // console.log(dataStation[0].position)
//             console.log(dataStation.length)
//             let long;
//             let lat;
//             let arrayStationPosition = [];
//             // let stationPosition;
//             let stationPosition = [];
//             for (let i = 0; i < dataStation.length; i++) {
//                 // console.log(i)
//                 // console.log(dataStation[i])

//                 lat = dataStation[i].position.latitude;
//                 long = dataStation[i].position.longitude;
//                 stationPosition = [lat, long];
//                 arrayStationPosition.push(stationPosition);
//             }
//             // console.log(arrayStationPosition)
//             console.log(arrayStationPosition.length)
            
//     //         stationNumber = dataStation[0].number;
//     //         stationName = dataStation[0].name;
//             // stationPosition = dataStation[0].position;
//     //         stationAddress = dataStation[0].address;
//     //         console.log(stationName)
//     //     })
//     //     .fail(function(data) {
//     //         console.log("Erreur de connexion !")
//     //     })
        
//     })

// console.log(data);

