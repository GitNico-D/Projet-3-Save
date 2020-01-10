class Map {
    constructor([coordinateX, coordinateY], zoom) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.zoom = zoom;
        this.bikeStationMap = L.map("bike_station_map").setView([this.coordinateX, this.coordinateY], this.zoom);
        this.generateMap();
    }


    generateMap() {
    console.log(this)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(this.bikeStationMap);
    }

    generateStationMarker(stationLatitude, stationLongitude, stationMarker) {
        let marker = L.marker([stationLatitude,stationLongitude], {icon: stationMarker}).addTo(this.bikeStationMap);
        marker.bindPopup("Tu viens de cliquer sur ce marqueur !").openPopup();
    }
}
