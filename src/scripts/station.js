// import { marker } from "leaflet";

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
                    // let allMarkersStations = [];
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
                    // self.map.generateStationMarker(stationData,colorStationMarker);
                    let markerStation = self.map.generateStationMarker(stationData,colorStationMarker);
                    // allMarkersStations.push(markerStation);
                    // console.log(markerStation)
                    // console.log(self.map)
                    // console.log(self.map.bikeStationMap)
                    // let bikeStationMap = self.map.bikeStationMap
                    // console.log(allMarkersStations)
                    // let stationName = $(".text").text(stationData.name)
                    // var popup = L.popup()
                        // .setContent()
                        // .openOn(self.map)
                    // markerStation.bindPopup(popup).openPopup()
                    // self.eventClickMarker(markerStation, bikeStationMap)
                    $("#bike_station_details").hide();
                    $("#user_form").hide();
                    markerStation.on("click", function(event){
                        self.map.bikeStationMap.setView(event.latlng, 20)
                        self.showInfosStation(stationData, markerStation)
                        // L.popup("Coucou").openPopup(self.map)
                        // markerStation.bindPopup("Coucou").openOn(self.map)
                    })
                    // self.map.bikeStationMap.on("click", marker, self.showInfosStation(stationData))
                    // self.map.bikeStationMap.on("click", marker, function(){
                    //     console.log("Marker !")
                    // })

                }
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    showInfosStation(stationData, markerStation) {
        let stationPopupInfos = L.popup()
            .setContent(`<p class=stationPopupInfos ><b> Vous êtes sur la station : </b></p>
                        <p>${stationData.name}</p>
                        <button id=station_details_informations class=station_details_informations> Informations détaillées >`);
                                
        markerStation.bindPopup(stationPopupInfos).openPopup()
        $("#station_details_informations").click(function(){
            $("#bike_station_details").show();
            $(".text").text(`La station ${stationData.name} est ${stationData.status} !`)
            $(".text").append(`<p> Il reste ${stationData.totalStands.availabilities.bikes} vélos disponibles à la location</p>`);
            $(".text").append(`<p> Si vous souhaitez effectué une réservation cliquez sur le bouton "Réserver" ci-dessous.</p>`);
            $(".text").append(`<button id=reservation_button class> Réserver`);
            
        })
                $("#reservation_button").click(function(){
                    $("#user_form").show();
                    console.log("Clique réservation")

        });        
    }
}