class Map {
    constructor([coordinateX, coordinateY], zoom) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.zoom = zoom;
        this.bikeStationMap = L.map("bike_station_map").setView([this.coordinateX, this.coordinateY], this.zoom);
        this.generateMap();
        console.log(this)
        $("#return_to_map").click(this.resetMapView.bind(this));
        $("#return_to_global_map").click(this.resetMapView.bind(this))
        this.bikeStationMap.on("click", this.closedInfosStation.bind(this))
    }


    generateMap() {
    console.log(this)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(this.bikeStationMap);
        console.log(this.bikeStationMap)
    }
    
    generateStationMarker(stationData, stationMarker) {
        return L.marker([stationData.position.latitude,stationData.position.longitude], {icon: stationMarker}).addTo(this.bikeStationMap);
    }

    eventMarkerClick(markerStation, event, stationName, showInfosStation) {
        let map = this.bikeStationMap
        // console.log(map)
        // console.log(this.bikeStationMap)
        markerStation.on(event, function(event) {
            // showInfosStation()
            map.setView(event.latlng, 20)
            // console.log(markerStation)
            let stationPopupInfos = L.popup()
                .setContent(`<p class=popup_infos_station ><b> Vous êtes sur la station : </b></p>
                            <p class=popup_infos_station_name>${stationName}</p>
                            <button id=station_details_informations class=station_details_informations> Informations détaillées`)                            
            markerStation.bindPopup(stationPopupInfos).openPopup()
            $("#station_details_informations").click(function(){
                console.log("Click info détaillé")
                showInfosStation()
            });
        });
        // console.log(markerStation)
        // this.markerPopup();
    }

    closedInfosStation() {
        $("#bike_station_details").hide();
    }

    // markerPopup(stationData, markerStation){
    //     let stationPopupInfos = L.popup()
    //         .setContent(`<p class=popup_infos_station ><b> Vous êtes sur la station : </b></p>
    //                     <p class=popup_infos_station_name>${stationData.name}</p>
    //                     <button id=station_details_informations class=station_details_informations> Informations détaillées
    //                     <button id=return_to_global_map class=return_to_global_map> Recentrer la carte`)
    //     markerStation.bindPopup(stationPopupInfos).openPopup()
    // }

    resetMapView(){
        console.log("Click Return to global map button")
        this.bikeStationMap.setView([this.coordinateX, this.coordinateY], this.zoom);
    }
}
