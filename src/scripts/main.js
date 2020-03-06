$(function() {
  let slideOne = new Slide();
  let mapOfLyon = new Map([45.77, 4.85], 11);
  let signatureCanvas = new Canvas(signature_canvas);
  let bookingBike = new Booking(mapOfLyon, signatureCanvas);
  let datasStations = new Station(mapOfLyon, bookingBike);
});
