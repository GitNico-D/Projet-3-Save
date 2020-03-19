let maxBookingTimer = 31;

class Booking {
    constructor(canvas) {
        this.canvas = canvas;
        this.intervalTimer = null;
        this.stationBookingName;
        this.startBookingTime;
        // this.bookingInProgress = false;
        if (sessionStorage.startBookingTime) {  
            console.log("Booking YES") 
            sessionStorage.removeItem("currentClickedStationName");    
            this.displayBookingSummary();
            this.bookingTimeLeft();
        } else {
            console.log("Booking NO")
            $("#booking_link").removeClass("text-success").addClass("text-danger").html("Aucune Réservation");
            this.existingUser();
        }    
        $("#booking_access_button").click(this.displayBookingForm.bind(this));    
        $("#booking_canvas_access_button").click(this.formVerification.bind(this));   
        $("#confirm_canvas").click(this.userBookingStorage.bind(this));
        $("#confirm_canvas").click(this.displayBookingSummary.bind(this));
    }

    displayBookingForm() {
        console.log("displayBookingForm");
        $("#booking_access_button").attr("disabled", "disabled");
        $("#booking_canvas_access_button").toggleClass("hide", false);
        $("#booking_return_to_map_button").toggleClass("hide", false);
        $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info");
        $("#booking_alert_title").html("Enregistrement d'une réservation !");
        $("#booking_alert_text").html("");
        $("#booking_alert_info").html("Pour effectuer une réservation, merci de renseigner votre <span>Nom</span> et <span>Prénom</span> dans le formulaire ci-dessous.");
        $("#user_booking_form").toggleClass("hide", false);
    }

    displayBookingSummary() {
        console.log("displayBookingSummary");
        $("#user_booking_summary").toggleClass("hide", false);
        $("#user_booking_summary_text").html("Un vélo vous est réservé sur la station <span id=booking_station_name_summary></span> !");
        $("#user_booking_summary_timer").html("Temps restants : <span id=booking_timer></span>");
        $("#booking_station_name_summary").text(sessionStorage.stationBookingName);
        $("#booking_access_button").removeAttr("disabled");
        // $("#booking_alert").toggleClass("hide", true);
        $("#booking_link").toggleClass("hide", false).removeClass("text-danger").addClass("text-success").html("Votre Réservation");
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

    stationInfosStorage(stationData) {
        this.stationBookingName = stationData.name;        
        sessionStorage.setItem("stationAvailableBikesStands", stationData.totalStands.availabilities.stands);
        sessionStorage.setItem("stationAvailableBikes", stationData.totalStands.availabilities.bikes);
        console.log(sessionStorage.stationAvailableBikesStands);
        console.log(sessionStorage.stationAvailableBikes);
    }

    existingUser() {
        if (localStorage.getItem("UserIdentity")) {
            console.log("existingUser => User Storage YES")
            let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
            $("#form_first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#form_last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
        } else {
            console.log("existingUser => User Storage NO");
            $("#booking_link").toggleClass("hide", true).removeClass("text-success").removeClass("text-danger");
        }
    }

    userBookingStorage() {
        console.log("userBookingStorage");
        event.preventDefault();
        let userIdentity = {
            userFirstName: $("#form_first_name").val(),
            userLastName: $("#form_last_name").val()
            };
        localStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
        this.startBookingTime = new Date();
        sessionStorage.setItem("startBookingTime", this.startBookingTime);
        sessionStorage.setItem("stationBookingName", this.stationBookingName);
        sessionStorage.stationAvailableBikesStands ++;
        sessionStorage.stationAvailableBikes --;
        $("#infos_station_available_bikes_stand").text(sessionStorage.stationAvailableBikesStands);
        $("#infos_station_available_bikes").text(sessionStorage.stationAvailableBikes); 
        $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-info").addClass("alert-success");
        $("#booking_alert_title").html("Réservation effectuée ! ");
        $("#booking_alert_text").html("");
        $("#booking_alert_info").html("Cette réservation est valable pour une durée de <span>20 minutes</span>, passé ce délai elle sera <span>automatiquement annulé</span>.")
        $("#user_booking_form").toggleClass("hide", true);
        setTimeout(() => {
            $("#booking_alert").toggleClass("hide", true);
        }, 5000);
    }

    timerConversion(timeLeft) {
        // console.log("timerConversion");
        let minutes = Math.floor(timeLeft / 60);
        let seconds = Math.floor(timeLeft - (minutes * 60));
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        // $("#booking_timer").html(`<span> ${minutes} : ${seconds} </span>`);
        return `<span> ${minutes} : ${seconds} </span>`;
    }

    bookingTimeLeft() {
        console.log("bookingTimeLeft");
        let startBookingTime = new Date(sessionStorage.getItem("startBookingTime"));
        this.intervalTimer = setInterval( e => {
            let dateNow = new Date();
            let timeDifference = (dateNow - startBookingTime);
            if (timeDifference > (maxBookingTimer * 1000)) {
                clearInterval(this.intervalTimer);
                // this.cancelBooking(); 
            } else {
                console.log(timeDifference, (maxBookingTimer * 1000));
                // this.timerConversion(maxBookingTimer - (timeDifference /1000));
                $("#booking_timer").html(this.timerConversion(maxBookingTimer - (timeDifference /1000)))
            }
        }, 1000);        
    }
}