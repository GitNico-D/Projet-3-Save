class Station {
    constructor(url) {
        let stationName;
        $.get(url, function(allStationsData){
            let stationData;
            for (let i = 0; i < allStationsData.length; i++) {
                // stationName = allStationsData[i].name;
                stationData = allStationsData[i];

                let stationAddress = allStationsData[i].address;
                let stationPosition = allStationsData[i].position;
            }
            stationName = stationData.name;
            console.log(stationName)
            console.log(stationData.name)
            this.name = $(".text").text(stationName);
        })
        console.log(stationData)

        this.stationAddress;
        this.stationPosition;
        // this.allStationsData()
        // this.stationProperty();
    }
    // stationProperty() {
    //     $(".text").append(`<p> ${this.name} </p>`);
    //     $(".text").append(`<p> ${this.address} </p>`);
    // }

    // allStationsData() {
    //     let arrayStationName = [];
    //     let arrayStationAddress = [];
    //     let arrayStationPosition = [];
    //     $.get(url, function(allStationsData){
    //         for (let i = 0; i < allStationsData.length; i++) {
    //             let stationName = allStationsData[i].name;
    //             let stationAddress = allStationsData[i].address;
    //             let stationPosition = allStationsData[i].position;
    //             // console.log(stationName)
    //             arrayStationName.push(stationName);
    //             arrayStationAddress.push(stationAddress);
    //             arrayStationPosition.push(stationPosition);
    //         }
    //     })
    //     console.log(arrayStationName)
    //     console.log(arrayStationAddress)
    //     console.log(arrayStationPosition)
    // }
    
}