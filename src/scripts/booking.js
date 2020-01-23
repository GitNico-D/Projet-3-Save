class Booking {
    constructor() {
        this.displayBookingForm();
        $("#first_name").keyup(this.userData.bind(this));
        $("#last_name").keyup(this.userData.bind(this));
    }

    displayBookingForm() {
        $("#reservation_button").click(function() {
            $("#bike_station_details").hide();
            $("#user_booking_form").show();
            console.log("Booking")
        })
    }

    userData() {
        console.log($("#first_name").val());
        console.log($("#last_name").val());
    }

    userBookingStation(stationData) {
        $("#reservation_confirm").hide();
        // $("#revervation_cancel").hide();
        $("form").submit(function(event) { 
            if ($("#first_name").val() != "" && $("#last_name").val() != "") {
                console.log($("#first.name").val());
                console.log($("#last_name").val());
                console.log("Affichage Canvas")
                $("#reservation_status_text").text(`Vous souhaitez effectuer la réservation d'un vélo à la ${stationData.name} ?`);
                $("#reservation_confirm").show();
                $("#reservation_cancel").show();
            } else {
                $("#reservation_status_text").text("Les champs Prénom et Nom sont obligatoires ! ");
            }
            event.preventDefault()
        })
    }
}