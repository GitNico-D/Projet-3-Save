class Booking {
    constructor() {
        this.displayBookingForm();
        // this.userBookingStation();
        this.userIdentityStorage();
        this.userExist();
    }

    displayBookingForm() {
        // $("#reservation_button").prop("disabled", true);
        $("#reservation_access_button").click(function() {
            $("#bike_station_details").hide();
            $("#user_booking_form").show();
            console.log("Booking")
        })
    }

    userIdentityStorage() {
        $("form").submit((event) => { 
            event.preventDefault()
            if ($("#first_name").val() != "" && $("#last_name").val() != "") {
                console.log("First user name : " + $("#first_name").val());
                console.log("Last user name : " + $("#last_name").val());        
                let userIdentity = {
                    userFirstName: $("#first_name").val(),
                    userLastName: $("#last_name").val()
                    };
                sessionStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
                // this.userBookingStation();
                $("#signature_canvas").css("display", "block");
            }
        });
    }

    userExist() {
        if (sessionStorage.getItem("UserIdentity")) {
            console.log("Un utilisateur est enregistré")
            let userIdentity = JSON.parse(sessionStorage.getItem("UserIdentity"));
            console.log(userIdentity);
            $("#first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#reservation_button").focus(function() {
                $(this).css("background-color", "green");
            })
            // this.userSummaryBooking(this);
        } else {
            this.userIdentityStorage();
        }
    }

    // userBookingStation() {
    //         $("#reservation_confirm").hide();
    //         $("#confirm_canvas").click( () => {
    //             $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez effectué la réservation d'un vélo à la station ${stationData.name}. Celle-ci est valable pendant 20 min !`);
    //             this.reservationTimer();
    //             $("form").hide();
    //             $("#signature_canvas").css("display", "none");
    //             $("#confirm_canvas").hide();
    //             $("#clear_canvas").hide();
    //         });
    // }
    
    userBookingStation(stationData) {
        if (sessionStorage.getItem("UserIdentity")) {
            $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
            Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
                                            Souhaitez-vous annulez ?`);
            $("#user_booking_form").hide();
            $("#reservation_cancel").show();
        } else {
            $("#reservation_confirm").hide();
            $("#confirm_canvas").click( () => {
                $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez effectué la réservation d'un vélo à la station ${stationData.name}. Celle-ci est valable pendant 20 min !`);
    
                this.reservationTimer();
                $("form").hide();
                $("#signature_canvas").css("display", "none");
                $("#confirm_canvas").hide();
                $("#clear_canvas").hide();
            });
        }
    }

    userSummaryBooking(stationData) {
        console.log("Reservation Summary")
        $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
                                            Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
                                            Souhaitez-vous annulez ?`);
        $("#user_booking_form").hide();
        $("#reservation_cancel").show();
    }

        // $("#revervation_cancel").hide();;
        // $("form").submit((event) => { 
        //     event.preventDefault()
        //     if ($("#first_name").val() != "" && $("#last_name").val() != "") {
        //         console.log("First user name : " + $("#first_name").val());
        //         console.log("Last user name : " + $("#last_name").val());
                // let firstName = $("#first_name").val();
                // let lastName = $("#last_name").val();
                // console.log(firstName, lastName)
                // console.log(this)
                // this.userIdentityStorage($("#first_name").val(), $("#last_name").val());

                // self.userIdentityStorage(firstName);
                // if ($("#first_name").val() === "") {
                //     $("#reservation_status_text").text("Merci de renseigner votre Prénom ! ");
                // } if ($("#last_name").val() === "") {
                //     $("#reservation_status_text").text("Merci de renseigner votre Nom ! ");
                // } 
                // $("#reservation_status_text").text("Pour valider votre réservation, merci d'aposer votre signature, dans le cadre suivant :");
                // $("#signature_canvas").css("display", "block");
                // $("#reservation_confirm").show();
                // $("#reservation_cancel").show();
                // }
            // else {
                // $("#reservation_status_text").text("Les champs Prénom et Nom sont obligatoires ! ");
            // }
        // })                

    reservationTimer() {
        let oneMinuteTimer = 60;
        let timer = setInterval(function(){
            if (oneMinuteTimer > 0) {
                oneMinuteTimer --;
                $("#reservation_status_timer").text(oneMinuteTimer);
            } else {
                clearInterval(timer);
                $("#reservation_status_timer").text("Le temps est expiré, votre réservation a été annulé !");
            }
        }, 1000);
    }
}