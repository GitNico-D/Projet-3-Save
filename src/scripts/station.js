class Station {
    constructor(url, map) {
        const self = this;
        console.log(self)
        this.map = map;
        // this.stationMarker = L.icon({iconUrl: `assets/img/leaf-${this.colorStationMarker}.png`});
        $.get(url)
            .done (function(allStationsData){
                for (let i = 0; i < allStationsData.length; i++) {
                    let stationData = allStationsData[i]; 
                    let stationLatitude = stationData.position.latitude;
                    let stationLongitude = stationData.position.longitude;
                    let colorStationMarker = "";
                    switch (stationData.status) {
                        case "OPEN": 
                            console.log("La station " + stationData.name + " est " + stationData.status)
                            console.log(stationData.totalStands.availabilities.bikes + " vélos sur " + stationData.totalStands.capacity + " sont disponiles à la location.");
                            if (stationData.totalStands.availabilities.bikes === 0) {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-orange.png`});
                            } else {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-green.png`});
                            }
                        break;
                        case "CLOSED":
                            colorStationMarker = L.icon({iconUrl: `assets/img/leaf-red.png`});
                            console.log("La station " + stationData.name + " est " + stationData.status)
                            console.log(stationData.totalStands.availabilities.bikes + " vélos sur " + stationData.totalStands.capacity + " sont disponiles à la location.");
                        break;
                    }
                    self.map.generateStationMarker(stationLatitude,stationLongitude,colorStationMarker);
                    // self.map.on()
                }
            })
            .fail(function(){
                console.log("Error ! ", error);
            })
            
        
    }
        
}