class Booking {
    constructor() {
        // this.displayBookingForm();
        // this.formVerification();
        this.refreshPage = false;
        // window.onload = () => {
        //     if (!this.refreshPage) {
        //         // console.log("DOM Loaded !")
        //         this.existingUserNoRefresh();
        //         // this.refreshPage = true;
        //     } else {
        //         this.existingUserRefresh();
        //     }
        //     this.refreshPage = !this.refreshPage;
        // };
        // $(document).on("load", () => {this.refreshPage = false});
        // $(document).ready(this.refreshPageTest.bind(this));
        // console.log(this.refreshPage);
        this.existingUser();
       
        // this.bookingTimeLeft();
        // $(window).on("load", this.bookingTimeLeft.bind(this));
        // $("#booking_return_to_map_button").click(() => {
        //     $("#booking_alert").toggleClass("hide", true);
        //     $("user_booking_form").toggleClass("hide", true);
        // })
        $("#cancel_booking").click(this.cancelBooking.bind(this));
        $("#booking_canvas_access_button").click(this.formVerification.bind(this));
        // $("#booking_summary_button").click(this.displayBookingSummary.bind(this));
        // $("#booking_access_button").click(this.existingUser.bind(this));
        this.maxBookingTimer = 121000;
        this.intervalTimer;
        // this.intervalTimer = setInterval(this.bookingTimeLeft.bind(this), 1000);
    }

    // refreshPageTest() {
    //     $(window).on("beforeunload", () =>{
    //         this.refreshPage = true;
    //         console.log(this.refreshPage)
    //       });
    // }

    displayBookingForm() {
            console.log("displayBookingForm");
            $("#booking_access_button").attr("disabled", "disabled");
            $("#booking_alert").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info").toggleClass("hide", false);
            $("#booking_alert_title").html("Enregistrement d'une réservation !");
            $("#booking_alert_text").html("");
            $("#booking_alert_info").html("Pour effectuer une réservation, merci de renseigner votre <span>Nom</span> et <span>Prénom</span> dans le formulaire ci-dessous.");
            $("#user_booking_form").toggleClass("hide", false);
            // $("#booking_summary_button").hide();
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
            })
            // $("#booking_return_to_map_button").click(() => {
            //     $("#booking_alert").toggleClass("hide", true);
            //     $("user_booking_form").toggleClass("hide", true);
            // })
            // this.bookingInProgress();
    }

    displayBookingSummary() {
        console.log("displayBookingSummary");
        // $("#user_booking_summary").fadeIn("slow").toggleClass("hide", false);
        $("#user_booking_summary_text").html("Un vélo vous est réservé sur la station <span id=booking_station_name_summary></span> !");
        $("#user_booking_summary_timer").html("Temps restants : <span id=booking_timer></span>");
        $("#booking_station_name_summary").text(sessionStorage.stationBookingName);
        this.bookingTimeLeft();
        $("#booking_access_button").removeAttr("disabled");
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
                $("#alert").fadeIn("slow").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info").toggleClass("hide", false).html("Pour <strong>valider</strong> votre réservation, merci d'aposer votre <strong>signature</strong> dans le cadre ci-dessous :");
                $("#canvas").toggleClass("hide", false);
                $("#signature_canvas").css("display", "block").fadeIn("slow");               
                $("#booking_canvas_access_button").fadeOut("fast");
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
            setTimeout(() => {
                $("#booking_alert").toggleClass("hide", true);
            }, 5000);
            $("#user_booking_summary").toggleClass("hide", false);
            $(".booking_link").removeClass("text-danger").addClass("text-success").html("Votre Réservation");
            this.displayBookingSummary();
            $("#canvas").toggleClass("hide", true);
            $("#alert").toggleClass("hide", true);
            $("#user_booking_form").toggleClass("hide", true);
        });
    }

    existingUser() {
        console.log("existingUser");
        // console.log(this.refreshPage)
        if (localStorage.getItem("UserIdentity")) {
            console.log("User Storage YES")
            let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
            $("#form_first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
            $("#form_last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
            this.existingBookingTimer();
        } else {
            console.log("User Storage NO")
            $("#booking_access_button").click( () => {
                this.displayBookingForm();
            });
        }
    }

    existingBookingTimer() {
        console.log("existingBookingTimer")
        if (!sessionStorage.startBookingTime) {
            console.log("Booking Timer NO")
            $("#booking_access_button").removeAttr("disabled");
            $("#booking_access_button").click(() => {
                if (!this.refreshPage) {
                    console.log("Access click NO REFRESH");
                    this.displayBookingForm();
                    this.refreshPage = true;
                } else {
                    console.log("Access Click REFRESH")
                    this.bookingInProgress();
                }
                // this.existingUser();
            });                    
        } else {
            $("#booking_access_button").removeAttr("disabled");
            console.log("Booking Timer NO"); 
            $("#user_booking_summary").toggleClass("hide", false);
            this.displayBookingSummary();             
            $("#booking_access_button").click( () => {
                if (!this.refreshPage) {
                    console.log("T click")
                    this.bookingInProgress();
                    // $("#user_booking_summary").toggleClass("hide", true);
                    this.refreshPage = true;
                } 
                else {
                    this.displayBookingForm();
                }
            });
        }
    }

    bookingInProgress() {
        console.log("bookingInProgress")          
            if (sessionStorage.stationBookingName === sessionStorage.currentClickedStationName) {
                console.log("Stations identiques !")
                $("#booking_alert").toggleClass("hide", false).removeClass("alert-danger").removeClass("alert-warning").removeClass("alert-success").addClass("alert-info");
                $("#booking_alert_title").html("Vous avez une réservation sur cette Station!");
                $("#booking_alert_text").html("");
                $("#booking_alert_info").html("");
                $("#user_booking_summary").toggleClass("hide", true);
                $("user_booking_form").toggleClass("hide", true);
                $("#alert_return_map_button").click(() => {
                    $("#booking_alert").toggleClass("hide", true);
                });
                $("#user_booking_summary").toggleClass("hide", false); 
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
                if (!sessionStorage.startBookingTime) {
                    $("#booking_alert").toggleClass("hide", true);
                }
                $("#keep_booking_button").click(() => {
                    $("#user_booking_summary").toggleClass("hide", true);  
                    this.displayBookingSummary();
                    $("#user_booking_summary").toggleClass("hide", false);  
                    $("#booking_alert").toggleClass("hide", true).removeClass("alert-warning");
                    // $("#return_to_global_map").toggleClass("hide", false);
                });
                $("#new_booking_button").click(() => {
                    $("#booking_access_button").attr("disabled", "disabled");
                    this.cancelBooking();
                    setTimeout(() => {
                        $("#booking_alert").toggleClass("hide", true).removeClass("alert-warning").removeClass("alert-danger");
                        $("#user_booking_summary").toggleClass("hide", true);
                        this.existingUser();
                        // this.displayBookingForm();
                    }, 5000);
                    $("#keep_booking_button").toggleClass("hide", true);
                    $("#new_booking_button").toggleClass("hide", true);
                });
                $("#alert_return_map_button").click(()=> {
                    // console.log("Click alert return map button");
                    if (sessionStorage.startBookingTime) {
                        this.displayBookingSummary();
                    } else {
                        $("#user_booking_summary").toggleClass("hide", true);
                        $("#booking_alert").toggleClass("hide", true);
                        $("user_booking_form").toggleClass("hide", true);
                    }
                });
            }        
        // });
    }

    cancelBooking() {
        console.log("cancelBooking");
        sessionStorage.clear();
        $("#user_booking_summary").toggleClass("hide", true);
        $("#booking_alert").removeClass("alert-info").removeClass("alert-success").addClass("alert-danger").toggleClass("hide", false);
        $("#booking_alert_title").html("Votre Réservation a été annulé !");
        $("#booking_alert_info").html("Vous pouvez refaire une réservation en sélectionnant une station !");
        $("#booking_alert_text").html("");
        $("#keep_booking_button").toggleClass("hide", true);
        $("#new_booking_button").toggleClass("hide", true);
        $("#user_booking_summary").toggleClass("hide", true);
        $("#alert_return_map_button").toggleClass("hide", true);
        $(".booking_link").removeClass("text-success").addClass("text-danger").html("Aucune Réservation");
        $("#alert_return_map_button").toggleClass("hide", false).click(() => {
            $("#booking_alert").toggleClass("hide", true);
            this.existingUser();
        });
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
        // clearInterval(this.intervalTimer);
    }

    timerConversion(timeLeft) {
        console.log("timerConversion")
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#booking_timer").html(minutes + " : " + seconds);
        // return minutes + " : " + seconds
    }

    bookingTimeLeft() {
        console.log("bookingTimeLeft");
        // let maxBookingTimer = 31000;
        let startBookingTime = new Date(sessionStorage.getItem("startBookingTime"));
        this.intervalTimer = setInterval( e => {
            let dateNow = new Date();
            let timeLeft = (dateNow - startBookingTime);
            // console.log(timeLeft); 
            if (timeLeft > this.maxBookingTimer) {
                // console.log(this.maxBookingTimer);
                // console.log("If bookingTimeLeft");
                this.cancelBooking();
                // this.stopTimer();
                // this.stopTimer(intervalTimer); 
            } else {
                // console.log(this.maxBookingTimer);
                this.timerConversion(timeLeft);
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
