let maxBookingTimer = 1201;

class Booking {
    constructor(map, canvas) {
        if (sessionStorage.startBookingTime) {  
            console.log("Booking YES") 
            sessionStorage.removeItem("currentClickedStationName");    
            $("#booking_link").removeClass("text-danger").addClass("text-success").html("Votre Réservation"); 
            this.displayBookingSummary();   
        } else {
            console.log("Booking NO")
            $("#booking_link").removeClass("text-success").addClass("text-danger").html("Aucune Réservation");  
            this.existingUser();
        }    
        this.canvas = canvas;
        this.map = map;
        $("#cancel_booking").click(this.cancelBooking.bind(this));
        $("#booking_canvas_access_button").click(this.formVerification.bind(this));
        $("#booking_access_button").click(this.existingUser.bind(this));
        
        this.intervalTimer;
    }

    displayBookingForm() {
            console.log("displayBookingForm");
            $("#booking_access_button").attr("disabled", "disabled");
            // $("#alert").toggleClass("hide", true);
            $("#booking_canvas_access_button").toggleClass("hide", false);
            $("#booking_return_to_map_button").toggleClass("hide", false);
            $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info");
            $("#booking_alert_title").html("Enregistrement d'une réservation !");
            $("#booking_alert_text").html("");
            $("#booking_alert_info").html("Pour effectuer une réservation, merci de renseigner votre <span>Nom</span> et <span>Prénom</span> dans le formulaire ci-dessous.");
            $("#user_booking_form").toggleClass("hide", false);
            $("#alert_return_map_button").click(() => {
                $("#booking_access_button").removeAttr("disabled");
                $("#booking_alert").toggleClass("hide", true);
                $("#user_booking_form").toggleClass("hide", true);
            });
            $("#booking_return_to_map_button").click(() => {
                $("#booking_alert").toggleClass("hide", true);
                $("#user_booking_form").toggleClass("hide", true);
                $("#booking_access_button").removeAttr("disabled");
                $("#alert").fadeOut("slow").toggleClass("hide", true);
            });
    }

    displayBookingSummary() {
        console.log("displayBookingSummary");
        $("#user_booking_summary").toggleClass("hide", false);
        $("#user_booking_summary_text").html("Un vélo vous est réservé sur la station <span id=booking_station_name_summary></span> !");
        $("#user_booking_summary_timer").html("Temps restants : <span id=booking_timer></span>");
        $("#booking_station_name_summary").text(sessionStorage.stationBookingName);
        $("#booking_access_button").removeAttr("disabled");
        $("#booking_link").toggleClass("hide", false).removeClass("text-danger").addClass("text-success").html("Votre Réservation");     
        this.bookingTimeLeft();
    }

    formVerification() {
            console.log("formVerification");
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() === "") {
                $("#alert").fadeIn("slow").removeClass("alert-warning").addClass("alert-danger").toggleClass("hide", false).html("<strong>Attention !</strong> Aucun <strong>Nom</strong> et <strong>Prénom</strong> n'a été renseignés !");  
            }
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() != "") {
                $("#alert").fadeIn("slow").removeClass("alert-danger").addClass("alert-warning").toggleClass("hide", false).html("<strong>Attention !</strong> Votre <strong>Prénom</strong> n'est pas renseigné !");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() === "") {
                $("#alert").fadeIn("slow").removeClass("alert-danger").addClass("alert-warning").toggleClass("hide", false).html("<strong>Attention !</strong> Votre <strong>Nom</strong> n'est pas renseigné !");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() != "") {
                $("#alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info").html("Pour <strong>valider</strong> votre réservation, merci d'aposer votre <strong>signature</strong> dans le cadre ci-dessous :");
                $("#canvas").toggleClass("hide", false);
                $("#signature_canvas").css("display", "block").fadeIn("slow");               
                $("#booking_canvas_access_button").toggleClass("hide", true);
                $("#booking_return_to_map_button").toggleClass("hide", true);
            }
        $("#form_first_name").focus(function(){
            $("#alert").fadeOut("slow").toggleClass("hide", true); 
        });
        $("#form_last_name").focus(function() {
            $("#alert").fadeOut("slow").toggleClass("hide", true); 
        });
    }

    userBookingStorage(stationData) {
        console.log("userBookingStorage");
        $("#confirm_canvas").click((event) => {
            console.log("confirmCanvas")
            event.preventDefault();
            let userIdentity = {
                userFirstName: $("#form_first_name").val(),
                userLastName: $("#form_last_name").val()
                };
            localStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
            sessionStorage.setItem("stationBookingName", stationData.name);
            let startBookingTime = new Date();
            sessionStorage.setItem("startBookingTime", startBookingTime);
            sessionStorage.setItem("stationAvailableBikesStands", stationData.totalStands.availabilities.stands);
            sessionStorage.setItem("stationAvailableBikes", stationData.totalStands.availabilities.bikes);
            sessionStorage.stationAvailableBikes --;
            sessionStorage.stationAvailableBikesStands ++;
            $("#infos_station_available_bikes").text(sessionStorage.stationAvailableBikes); 
            $("#infos_station_available_bikes_stand").text(sessionStorage.stationAvailableBikesStands);
            $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-info").addClass("alert-success");
            $("#booking_alert_title").html("Réservation effectuée ! ");
            $("#booking_alert_text").html("");
            $("#booking_alert_info").html("Cette réservation est valable pour une durée de <span>20 minutes</span>, passé ce délai elle sera <span>automatiquement annulé</span>.")
            // setTimeout(() => {
            //     // $("#booking_alert").toggleClass("hide", true);
            // }, 5000);
            this.resetDisplayBooking();
            this.map.resetMapView();
            this.displayBookingSummary();
        });
    }

    existingUser() {
        console.log("existingUser");
        if (localStorage.getItem("UserIdentity")) {
            console.log("User Storage YES")
            let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
            $("#form_first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#form_last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#booking_access_button").click( () => {
                if (sessionStorage.startBookingTime) {
                    console.log("User ET Booking click 'Réserver'")
                    this.bookingInProgress();
                } else {
                    console.log("User ET NON Booking click 'Réserver'");
                    this.displayBookingForm();
                }
            });
        } else {
            console.log("User Storage NO");
            $("#booking_link").toggleClass("hide", true).removeClass("text-success").removeClass("text-danger");
            $("#booking_access_button").click( () => {
                this.displayBookingForm();
            });
        }
    }

    bookingInProgress() {
        console.log("bookingInProgress")   
        // this.displayBookingSummary();    
        // $("#booking_access_button").click( () => {   
            if (sessionStorage.stationBookingName === sessionStorage.currentClickedStationName) {
                console.log("Stations identiques !")
                $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-warning").removeClass("alert-success").addClass("alert-info");
                $("#booking_alert_title").html("Vous avez une réservation sur cette Station!");
                $("#booking_alert_text").html("");
                $("#booking_alert_info").html("");
                $("#keep_booking_button").toggleClass("hide", true);
                $("#new_booking_button").toggleClass("hide", true);
                // this.resetDisplayBooking();                
                $("user_booking_form").toggleClass("hide", false);
                $("#alert_return_map_button").toggleClass("hide", false).click(() => {
                    $("#booking_alert").toggleClass("hide", true);
                });
                // $("#user_booking_summary").toggleClass("hide", false); 
                this.displayBookingSummary();
            } else { 
                console.log("Station différentes !")
                $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-info").removeClass("alert-success").addClass("alert-warning");
                $("#booking_alert_title").html("Réservation en cours !");
                $("#booking_alert_text").html("Vous avez déjà un vélo réservé sur la station <span id=booking_station_name_storage></span>.");
                $("#booking_alert_info").html("<span>Attention !</span> Si vous effectué une nouvelle réservation sur la station <span id=current_clicked_station_name></span>, la précédente sera automatiquement <span>ANNULÉ !</span>")
                $("#booking_station_name_storage").text(sessionStorage.stationBookingName);
                $("#current_clicked_station_name").text(sessionStorage.currentClickedStationName);
                $("#keep_booking_button").toggleClass("hide", false);
                $("#new_booking_button").toggleClass("hide", false);
                $("#alert_return_map_button").toggleClass("hide", false);
                $("#user_booking_summary").toggleClass("hide", true);
                $("#keep_booking_button").click(() => {
                    this.map.resetMapView();
                    this.displayBookingSummary();
                    $("#booking_alert").toggleClass("hide", true).removeClass("alert-warning");
                });
                $("#new_booking_button").click(() => {
                    $("#booking_access_button").removeAttr("disabled");
                    this.cancelBooking();
                    setTimeout(() => {
                        $("#booking_alert").toggleClass("hide", true).removeClass("alert-warning").removeClass("alert-danger");
                        // $("#user_booking_summary").toggleClass("hide", true);
                        // this.existingUser();
                        // this.displayBookingForm();
                    }, 5000);
                    // $("#keep_booking_button").toggleClass("hide", true);
                    // $("#new_booking_button").toggleClass("hide", true);
                    this.resetDisplayBookingAlertButton();
                });
                $("#alert_return_map_button").click(() => {
                    // console.log("Click alert return map button");
                    if (sessionStorage.startBookingTime) {
                        this.displayBookingSummary();
                    } else {
                        $("#user_booking_summary").toggleClass("hide", true);
                        // $("#booking_alert").toggleClass("hide", true);
                        // $("user_booking_form").toggleClass("hide", true);
                        this.resetDisplayBooking();
                    }
                });
            }                    
        // });
    }

    resetDisplayBooking() {
        $("#booking_alert").toggleClass("hide", true);
        $("#user_booking_form").toggleClass("hide", true);
        $("#booking_canvas_access_button").toggleClass("hide", true);
        $("#booking_return_to_map_button").toggleClass("hide", true);
        this.canvas.clearCanvas.bind(this);
        $("#canvas").toggleClass("hide", true);
        $("#alert").toggleClass("hide", true);
    }

    resetDisplayBookingAlertButton() {
        $("#keep_booking_button").toggleClass("hide", true);
        $("#new_booking_button").toggleClass("hide", true);
        $("#alert_return_map_button").toggleClass("hide", true);
    }

    cancelBooking() {
        console.log("cancelBooking");
        $("#user_booking_summary").toggleClass("hide", true);
        $("#booking_alert").removeClass("alert-info").removeClass("alert-success").addClass("alert-danger").toggleClass("hide", false);
        $("#booking_alert_title").html("Votre Réservation a été annulé !");
        $("#booking_alert_info").html("Vous pouvez refaire une réservation en sélectionnant une station !");
        $("#booking_alert_text").html("");
        let availableBikesStandsNow = JSON.parse(sessionStorage.getItem("stationAvailableBikesStands"));
        let availableBikesNow = JSON.parse(sessionStorage.getItem("stationAvailableBikes"));
        availableBikesStandsNow --;        
        availableBikesNow ++;
        $("#infos_station_available_bikes_stand").text(availableBikesStandsNow);
        $("#infos_station_available_bikes").text(availableBikesNow); 
        sessionStorage.clear();
        this.resetDisplayBookingAlertButton();
        this.canvas.clearCanvas();
        $("#user_booking_summary").toggleClass("hide", true);
        $(".booking_link").removeClass("text-success").addClass("text-danger").html("Aucune Réservation");
        $("#alert_return_map_button").toggleClass("hide", false).click(() => {
            // $("#booking_alert").toggleClass("hide", true);
            this.resetDisplayBooking();
        });
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
        // if (intervalTimer) {
        //     this.stopTimer(intervalTimer);
        // }
        // clearInterval(this.intervalTimer);
    }

    timerConversion(timeLeft) {
        console.log("timerConversion")
        // let minutes = Math.floor(maxBookingTimer / 60);
        // let seconds = maxBookingTimer - (minutes * 60);
        let minutes = Math.floor(timeLeft / 60);
        let seconds = Math.floor(timeLeft - (minutes * 60));
        // let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        // let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#booking_timer").html(`<span> ${minutes} : ${seconds} </span>`);
        // return minutes + " : " + seconds
    }

    bookingTimeLeft() {
        console.log("bookingTimeLeft");
        // let maxBookingTimer = 31000;
        let startBookingTime = new Date(sessionStorage.getItem("startBookingTime"));
        this.intervalTimer = setInterval( e => {
        // let intervalTimer = setInterval( e => {
            let dateNow = new Date();
            let timeLeft = (dateNow - startBookingTime);
            console.log(timeLeft); 
            if ((timeLeft /1000) > maxBookingTimer) {
                // console.log(this.maxBookingTimer);
                // console.log("If bookingTimeLeft");
                this.cancelBooking();
                // this.cancelBooking(intervalTimer);
                // this.stopTimer();
                // this.stopTimer(intervalTimer); 
            } else {
                // console.log(this.maxBookingTimer);
                // maxBookingTimer --; 
                this.timerConversion(timeLeft /1000);
                // console.log("Else bookingTimeLeft")
                // $("#booking_timer").html(this.timerConversion(timeLeft));
            }
        }, 1000);
    }

    // stopTimer(intervalTimer) {
    //     console.log("stopTimer");
    //     clearInterval(intervalTimer);
    // }

}