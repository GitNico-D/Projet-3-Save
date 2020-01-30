class Booking {
    constructor(signatureCanvas) {
        this.signature = signatureCanvas;
        this.displayBookingForm();
        this.userBookingStation.bind(self);
        $("#first_name").keyup(this.userData.bind(this));
        $("#last_name").keyup(this.userData.bind(this));
        console.log(typeof sessionStorage)
    }

    displayBookingForm() {
        // $("#reservation_button").prop("disabled", true);
        $("#reservation_button").click(function() {
            $("#bike_station_details").hide();
            $("#user_booking_form").show();
            console.log("Booking")
        })
    }

    userData() {
        console.log($("#first_name").val())
        console.log(typeof sessionStorage)
        // if (typeof sessionStorage != )
        let userData = {
            userFirstName: $("#first_name").val(),
            userLastName: $("#last_name").val()
        };
        sessionStorage.setItem("UserData", JSON.stringify(userData));
        // console.log(sessionStorage.JQuery.parseJSON(UserData.userFirstName));
        console.log(sessionStorage.UserLastName);

    }

    userBookingStation(stationData) {
        $("#reservation_confirm").hide();
        // $("#revervation_cancel").hide();
        console.log(this.signature);

        $("form").submit(function(event) { 
            event.preventDefault()
            if ($("#first_name").val() === "" && $("#last_name").val() === "") {
                if ($("#first_name").val() === "") {
                    $("#reservation_status_text").text("Merci de renseigner votre Prénom ! ");
                } if ($("#last_name").val() === "") {
                    $("#reservation_status_text").text("Merci de renseigner votre Nom ! ");
                } 
                console.log("First user name : " + $("#first_name").val());
                console.log("Last user name : " + $("#last_name").val());
                $("#reservation_status_text").text("Pour valider votre réservation, merci d'aposer votre signature, dans le cadre suivant :");
                $("#signature_canvas").css("display", "block");
                // $("#reservation_confirm").show();
                // $("#reservation_cancel").show();
                }
            else {
                $("#reservation_status_text").text("Les champs Prénom et Nom sont obligatoires ! ");
            }
        })

                
    }
}