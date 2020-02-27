class Map {
    constructor([coordinateX, coordinateY], zoom) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.zoom = zoom;
        this.bikeStationMap = L.map("bike_station_map").setView([this.coordinateX, this.coordinateY], this.zoom);
        this.generateMap();
        $("#return_to_map_button").click(this.resetMapView.bind(this));
        $("#alert_return_map_button").click(this.resetMapView.bind(this));
        this.bikeStationMap.on("click", this.closedInfosStation.bind(this));
    }
    

    generateMap() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(this.bikeStationMap);
    }
    
    generateStationMarker(stationData, stationMarker) {
        let popup = L.popup().setContent(`<p class=popup_infos_station> Station sélectionné : </p>
                                            <p class=popup_infos_station_name>${stationData.name}</p>`);
        return L.marker([stationData.position.latitude,stationData.position.longitude], {icon: stationMarker}).bindPopup(popup);
    }

    eventMarkerClick(markerStation, event, showInfosStation) {
        let map = this.bikeStationMap
        markerStation.on(event, function(event) {
            map.setView(event.latlng, 20)
            showInfosStation();
        });
    }

    closedInfosStation() {
        $("#bike_station_map").removeClass("col-lg-9").addClass("col");
        $("#bike_station_details").hide();
    }

    markerCluster(allMarkersStations) {
        let markersStationCluster = new L.MarkerClusterGroup();
        for (let i = 0; i < allMarkersStations.length; i++) {
            markersStationCluster.addLayer(allMarkersStations[i])
        }
        this.bikeStationMap.addLayer(markersStationCluster)
    }

    resetMapView(){
        this.bikeStationMap.setView([this.coordinateX, this.coordinateY], this.zoom);
        $("#bike_station_details").hide();
        $("#bike_station_map").addClass("col").removeClass("col-lg-9");
    }
}
