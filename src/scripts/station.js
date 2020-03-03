class Station {
    constructor(map, booking) {
        const self = this;
        this.map = map;
        this.booking = booking;
        $.get("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23")
            .done (function(allStationsData){
                let allMarkersStations = [];
                for (let i = 0; i < allStationsData.length; i++) {
                    let stationData = allStationsData[i];
                    let colorMarker = stationData.status === "OPEN" ? stationData.totalStands.availabilities.bikes === 0 ? "orange" :  "green" : "red";
                    let colorStationMarker = L.icon({iconUrl: `assets/img/leaf-${colorMarker}.png`});           
                    let markerStation = self.map.generateStationMarker(stationData,colorStationMarker);
                    self.map.eventMarkerClick(markerStation, "click", self.showInfosStation.bind(self, stationData, markerStation));
                    allMarkersStations.push(markerStation);
                    // $("#bike_station_details").hide();
                    // $("#user_booking_form").hide();
                    }
                self.map.markerCluster(allMarkersStations)
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    showInfosStation(stationData) {
        $("#bike_station_details").toggleClass("hide", false);
        $("#bike_station_map").removeClass("col").addClass("col-lg-9");
        $("#infos_station_name").text(stationData.name);
        $("#infos_station_total_station_bikes").text(stationData.totalStands.capacity);   
        $("#infos_station_available_bikes_stand").text(stationData.totalStands.availabilities.stands);
        $("#infos_station_available_bikes").text(stationData.totalStands.availabilities.bikes); 
        sessionStorage.setItem("currentClickedStationName", stationData.name);
        if (stationData.status === "OPEN") {            
            $("#station_status").text("OUVERTE").removeClass("text-danger").removeClass("text-warning").addClass("text-success"); 
            $("#infos_station_description_status").html("La station est disponible pour la <span>location</span> et le <span>retour</span> de vélos.");
            $("#available_bikes").removeClass("table-danger").addClass("table-success");
            $("#booking_access_button").toggleClass("hide", false);
            $("#booking_button_description").toggleClass("hide", false);
            $("#button_split").toggleClass("hide", false);
            this.booking.userBookingStorage(stationData);
        } if (stationData.status === "CLOSED") {
            $("#station_status").text("FERMÉ").removeClass("text-success").removeClass("text-warning").addClass("text-danger"); 
            $("#infos_station_description_status").html("Veuillez nous excuser pour le dérangement occasionné. Merci de vous rapprocher d'une autre station de location.");
            $("#available_bikes").removeClass("table-success").addClass("table-danger");            
            $("#booking_access_button").toggleClass("hide", true);
            $("#booking_button_description").toggleClass("hide", true);
            $("#button_split").toggleClass("hide", true);
        } if (stationData.status === "OPEN" && stationData.totalStands.availabilities.bikes === 0) {
            $("#station_status").text("OUVERTE").removeClass("text-success").removeClass("text-danger").addClass("text-warning");
            $("#infos_station_description_status").html("<span>Aucun</span> vélos n'est actuellement disponibles à la location. Merci de vous rapprocher d'une autre station de location.");
            $("#available_bikes").addClass("table-danger");
            $("#booking_access_button").toggleClass("hide", true);
            $("#booking_button_description").toggleClass("hide", true);
            $("#button_split").toggleClass("hide", true);
        }
    }
}