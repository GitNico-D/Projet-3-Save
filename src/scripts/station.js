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
                    // let optionStation;
                    let colorMarker = stationData.status === "OPEN" ? stationData.totalStands.availabilities.bikes === 0 ? "orange" :  "green" : "red";
                    let colorStationMarker = L.icon({iconUrl: `assets/img/leaf-${colorMarker}.png`});           
                    let markerStation = self.map.generateStationMarker(stationData,colorStationMarker);
                    self.map.eventMarkerClick(markerStation, "click", self.showInfosStation.bind(self, stationData, markerStation));
                    allMarkersStations.push(markerStation);
                    $("#bike_station_details").hide();
                    // $("#user_booking_form").hide();
                    }
                self.map.markerCluster(allMarkersStations)
            })
            .fail(function(){
                console.log("Error ! ", error);
            })        
    }
    
    showInfosStation(stationData, markerStation) {
        console.log(this.booking)
        $("#bike_station_details").show();
        $("#infos_station_name").text(stationData.name);
        $("#infos_station_total_station_bikes").text(stationData.totalStands.capacity);   
        $("#infos_station_available_bikes_stand").text(stationData.totalStands.availabilities.stands);
        $("#infos_station_available_bikes").text(stationData.totalStands.availabilities.bikes); 
        sessionStorage.setItem("currentClickedStationName", stationData.name);
        if (stationData.status === "OPEN") {            
            $("#station_status").text("OUVERTE").addClass("text-success");
            $("#station_status").removeClass("text-danger");
            $("#station_status").removeClass("text-warning"); 
            $("#infos_station_description_status_green").show();                    
            $("#infos_station_description_status_red").hide();
            $("#infos_station_description_status_orange").hide();
            $("#reservation_access_button").show();
            $("#reservation_button_description").show();
            $("#button_split").show();
            this.booking.userBookingStorage(stationData);
        } if (stationData.status === "CLOSED") {
            $("#station_status").text("FERMÉ").addClass("text-danger"); 
            $("#station_status").removeClass("text-success");
            $("#station_status").removeClass("text-warning"); 
            $("#infos_station_description_status_red").show();
            $("#infos_station_description_status_green").hide();
            $("#infos_station_description_status_orange").hide();
            $("#reservation_access_button").hide();
            $("#reservation_button_description").hide();
            $("#button_split").hide();
        } if (stationData.status === "OPEN" && stationData.totalStands.availabilities.bikes === 0) {
            $("#station_status").text("OUVERTE").addClass("text-warning");
            $("#station_status").removeClass("text-success");
            $("#station_status").removeClass("text-danger"); 
            $("#infos_station_description_status_orange").show();
            $("#infos_station_description_status_green").hide();
            $("#infos_station_description_status_red").hide();
            $("#reservation_access_button").hide();
            $("#reservation_button_description").hide();
            $("#button_split").hide();
        }
    }
}