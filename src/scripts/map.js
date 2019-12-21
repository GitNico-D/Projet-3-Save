class Map {
    constructor([coordinateX, coordinateY], zoom) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.zoom = zoom;
        this.generateMap();
    }


    generateMap() {
    console.log(this)
        let bikeStationMap = L.map("bike_station_map").setView([this.coordinateX, this.coordinateY], this.zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(bikeStationMap);

    }
}

// let testingMap = L.map("bike_station_map").setView([51.505, -0.09], 13);
// console.log(testingMap)
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmljb2RldiIsImEiOiJjazRmd3k5b3MwcW5wM2RuOW8wenMzd3g2In0.quUsVa6n75W-XR0yFCYFyg', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     accessToken: 'pk.eyJ1Ijoibmljb2RldiIsImEiOiJjazRmd3k5b3MwcW5wM2RuOW8wenMzd3g2In0.quUsVa6n75W-XR0yFCYFyg'
// }).addTo(testingMap);