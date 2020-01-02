class Station {
    constructor(stationNumber,stationName,stationPosition, stationAddress) {
        this.number = stationNumber,
        this.name = stationName;
        this.position = stationPosition;
        this.address = stationAddress;
        // console.log(this);
        this.stationProperty();
    }

    stationProperty() {
        $(".text").append(`<p> ${this.name} </p>`);
        $(".text").append(`<p> ${this.address} </p>`);
    }
}