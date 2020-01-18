class Station {
    constructor(map) {
        // console.log(self)
        const self = this;
        this.map = map;
        $.get("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23")
            .done (function(allStationsData){
                let allMarkersStations = [];
                for (let i = 0; i < allStationsData.length; i++) {
                    let stationData = allStationsData[i]; 
                    // console.log(stationData)
                    let stationOptionInformationsShow; 
                    let colorStationMarker = "";
                    switch (stationData.status) {
                        case "OPEN": 
                            if (stationData.totalStands.availabilities.bikes === 0) {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-orange.png`});
                                stationOptionInformationsShow = 1;
                            } else {
                                colorStationMarker = L.icon({iconUrl: `assets/img/leaf-green.png`});
                                stationOptionInformationsShow = 2;
                            }
                        break;
                        case "CLOSED":
                            colorStationMarker = L.icon({iconUrl: `assets/img/leaf-red.png`});
                            stationOptionInformationsShow = 0;
                        break;
                    }                    
                    // self.map.generateStationMarker(stationData,colorStationMarker);
                    // console.log(self.map)
                    let markerStation = self.map.generateStationMarker(stationData,colorStationMarker);
                    self.map.eventMarkerClick(markerStation, "click", stationData.name, self.showInfosStation.bind(self, stationData, markerStation));
                    // console.log(allMarkersStations)
                    // allMarkersStations.push(markerStation);
                    self.map.markerCluster(allMarkersStations);
                    // self.map.markerCluster(markerStation);
                    $("#bike_station_details").hide();
                    $("#user_form_booking").hide();
                    // markerStation.on("click", function(event){
                    //     self.map.bikeStationMap.setView(event.latlng, 20)
                    //     self.showInfosStation(stationData, markerStation, stationOptionInformationsShow, self.map)
                    // })
                }
                // console.log(allMarkersStations)
                    // self.map.bikeStationMap.on('click', function(event){
                    //     console.log("Map click " + event.latlng)
                    // })
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    showInfosStation(stationData, markerStation, bikeStationMap, stationOptionInformationsShow) {
        console.log(stationData.name)
        console.log(this)
        console.log(markerStation)
        $("#bike_station_details").show();
        $("#infos_station_name").text(stationData.name);
        if (stationData.status === "OPEN") {
            console.log("OPEN")
            $("#infos_station_description").text(`La station est ouverte, et il reste ${stationData.totalStands.availabilities.bikes} vélos disponibles à la location.
                                                Si vous souhaitez effectuer une réservation cliquer sur le bouton ci-dessous. Vous pouvez sinon retourner sur la carte pour sélectionner une autre station.`);
            $("#reservation_button").show();
            $("#button_split").show();
        } if (stationData.status === "CLOSED") {
            console.log("CLOSED")
            $("#infos_station_description").text("Désolé mais cette station est actuellement fermé. Veuillez nous excuser pour le dérangement occasionné. Merci de vous rapprocher d'une autre station de location.")
            $("#reservation_button").hide();
            $("#button_split").hide();
        } if (stationData.status === "OPEN" && stationData.totalStands.availabilities.bikes === 0) {
            console.log("OPEN mais 0 Vélos")
            $("#infos_station_description").text(`La station est bien ouverte, malheureusement ${stationData.totalStands.availabilities.bikes} vélos sont
                                                disponibles à la location. Merci de vous rapprocher d'une autre station de location.`);
            $("#reservation_button").hide();
        }
                                                // markerStation.markerPopup(stationData, markerStation)
        // let stationPopupInfos = L.popup()
        //     .setContent(`<p class=popup_infos_station ><b> Vous êtes sur la station : </b></p>
        //                 <p class=popup_infos_station_name>${stationData.name}</p>
        //                 <button id=station_details_informations class=station_details_informations> Informations détaillées
        //                 <button id=return_to_global_map class=return_to_global_map> Recentrer la carte`)
        // self.markerStation.bindPopup(stationPopupInfos).openPopup()
        
        // $("#return_to_global_map").click(function(){
        //     console.log("Reset map")
        //     self.map.resetMapView();
        //     $("#bike_station_details").hide()
        //     // $("#bike_station_informations").empty()
        // });
        // $("#station_details_informations").click(function(){
        //     console.log("Click info détaillé")
    //         if (stationOptionInformationsShow === 0) {
    //             $("#bike_station_details").show();
                    // $("#bike_station_informations").append("<p>Désolé mais cette station est actuellement fermé. Veuillez nous excuser pour le dérangement.</p>");
    //                 $("#bike_station_informations").append("<p> Merci de vous rapprocher d'une autre station de location.");
    //                 $("#bike_station_informations").append("<button id=return_map class=return_to_map_station> Retour sur la carte")
    //         } if (stationOptionInformationsShow === 1) {
    //             $("#bike_station_details").show();
    //             $("#bike_station_informations").append(`La station ${stationData.name} est bien ouverte !`)
    //             $("#bike_station_informations").append(`<p> Il reste malheureusement ${stationData.totalStands.availabilities.bikes} disponibles à la location. Merci de vous rapprocher d'une autre station de location.</p>`);
    //             $("#bike_station_informations").append(`<p> Nous vous souhaitons une bonne journée !</p>`);
    //             $("#bike_station_informations").append(`<button id=reservation_button > Réserver`);            
    //             $("#bike_station_informations").append("<button id=return_map class=return_to_map_station> Reotur sur la carte")
    //         } if (stationOptionInformationsShow === 2) {
    //             $("#bike_station_details").show();
    //             $("#bike_station_informations").append(`La station ${stationData.name} est Ouverte !`)
    //             $("#bike_station_informations").append(`<p> Il reste ${stationData.totalStands.availabilities.bikes} vélos disponibles à la location.</p>`);
    //             $("#bike_station_informations").append(`<p> Si vous souhaitez effectuer une réservation cliquez sur le bouton "Réserver" ci-dessous.</p>`);
    //             $("#bike_station_informations").append(`<button id=reservation_button > Réserver`);            
    //             $("#reservation_button").click(function(){
    //                 $("#user_form_booking").show();
    //                 console.log("Clique réservation")
    //             })
    //         }
        // });        
    }

    clearInfosStation(bikeStationMap){
        bikeStationMap.on('click', function(event){
            console.log("Map Click" + event.latlng)
            // $("#bike_station_details").hide()
        })
    }
}