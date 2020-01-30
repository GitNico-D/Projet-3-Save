// let url = "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=02097fba5ab73ba010c3d0375ab4c4aa19dd9f23"

$(function(){
    let slideOne = new Slide ();
    let mapOfLyon = new Map ([45.75, 4.85], 11);
    let signatureCanvas = new Canvas(signature_canvas);
    let bookingBike = new Booking(signatureCanvas);
    let datasStations = new Station(mapOfLyon, bookingBike);
});

