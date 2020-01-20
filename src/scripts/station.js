class Station {
    constructor(map, booking) {
        // console.log(self)
        const self = this;
        this.map = map;
        this.booking = booking;
        $.get("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23")
            .done (function(allStationsData){
                let allMarkersStations = [];
                for (let i = 0; i < allStationsData.length; i++) {
                    let stationData = allStationsData[i];
                    // let optionStation;
                    let colorMarker = stationData.status === "OPEN" ? (stationData.totalStands.availabilities.bikes === 0 ? "orange" :  "green" ) : "red";
                    let colorStationMarker = L.icon({iconUrl: `assets/img/leaf-${colorMarker}.png`});           
                    let markerStation = self.map.generateStationMarker(stationData,colorStationMarker);
                    self.map.eventMarkerClick(markerStation, "click", stationData.name, self.showInfosStation.bind(self, stationData, markerStation));
                    // self.booking.displayBooking()
                    allMarkersStations.push(markerStation);
                    $("#bike_station_details").hide();
                    $("#user_form_booking").hide();
                    }
                self.map.markerCluster(allMarkersStations)
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    showInfosStation(stationData, markerStation) {
        console.log(stationData.name)
        console.log(this)
        console.log(markerStation)
        $("#bike_station_details").show();
        $("#infos_station_name").text(stationData.name);
        let option;
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
            $("#button_split").hide();
        }
    }
}