class Station {
    constructor(map) {
        // console.log(self)
        const self = this;
        this.map = map;
        // this.stationMarker = L.icon({iconUrl: `assets/img/leaf-${this.colorStationMarker}.png`});
        $.get("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23")
            .done (function(allStationsData){
                for (let i = 0; i < allStationsData.length; i++) {
                    let stationData = allStationsData[i]; 
                    // console.log(stationData)
                    let stationLatitude = stationData.position.latitude;
                    let stationLongitude = stationData.position.longitude;
                    let colorStationMarker = "";
                    switch (stationData.status) {
                        case "OPEN": 
                            // console.log("La station " + stationData.name + " est " + stationData.status)
                            // console.log(stationData.totalStands.availabilities.bikes + " vélos sur " + stationData.totalStands.capacity + " sont disponiles à la location.");
                            if (stationData.totalStands.availabilities.bikes === 0) {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-orange.png`});
                            } else {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-green.png`});
                            }
                        break;
                        case "CLOSED":
                            colorStationMarker = L.icon({iconUrl: `assets/img/leaf-red.png`});
                            // console.log("La station " + stationData.name + " est " + stationData.status)
                            // console.log(stationData.totalStands.availabilities.bikes + " vélos sur " + stationData.totalStands.capacity + " sont disponiles à la location.");
                        break;
                    }                    
                    self.map.generateStationMarker(stationData,colorStationMarker);
                }
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    // showInfosStation(stationData) {
    //     $(".text").text(stationData.name);
    // }

    // showInfosStation = (stationData) => {
    //     $(".text").text(stationData.name);
    // }
            
}