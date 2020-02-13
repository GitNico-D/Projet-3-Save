class Booking {
    constructor() {
        this.displayBookingForm();
        this.formVerification();
        // this.userBookingStation();
        // this.userIdentityStorage();
        // this.userExist();
        // $(window).on("load", this.userBookingStatus.bind(this));
        // $(window).on("unload", this.cancelBooking.bind(this));
        // $("#reservation_cancel").click(this.cancelBooking.bind(this));
        // this.timerDuration = (20 * 60);
        // this.bookingStart = false;
        // this.bookingTimer;
    }

    displayBookingForm() {
        $("#reservation_access_button").click(function() {
            $("#form_direction").show();
            $("#return_button_description").hide();
            $("#return_to_global_map").hide();
            $("#user_booking_form").show();
            console.log("Booking")
        })
    }

    formVerification() {
        $("#reservation_canvas_access_button").click((event) => {
            event.preventDefault();
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() === "") {
                $(".alert_nothing").addClass("alert").show("slow");  
            }
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() != "") {
                $(".alert_first_name").addClass("alert").show("slow");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() === "") {
                $(".alert_last_name").addClass("alert").show("slow");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() != "") {
                // $("#canvas").show();
                $(".alert_canvas").addClass("alert").show("slow");
                $("#signature_canvas").css("display", "block").fadeIn("slow");               
                $("#reservation_canvas_access_button").fadeOut("fast");
            }
        });
        $("#form_first_name").focus(function(){
            $(".alert").hide("slow"); 
        });
        $("#form_last_name").focus(function() {
            $(".alert").hide("slow");
        });
    }

    userBookingStorage(stationData) {
        $("#confirm_canvas").click((event) => {
            event.preventDefault();
            let userIdentity = {
                userFirstName: $("#form_first_name").val(),
                userLastName: $("#form_last_name").val()
                };
            localStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
            sessionStorage.setItem("stationName", stationData.name);
            // let timerBookingStart = new Date().getTime();
            let timerBookingEnd = new Date().getTime() + 1200;
            console.log(timerBookingEnd);
            console.log(timerBookingEnd - 1200);
            sessionStorage.setItem("bookingTimer", timerBookingEnd)
            console.log(userIdentity.userFirstName, userIdentity.userLastName);
            $("#user_booking_form").hide();
            $("#signature_canvas").css("display", "none");
            $("#booking_station_name").text(sessionStorage.stationName);
            $("#reservation_status").show();
            let timeLeftBooking = this.reservationTimer(timerBookingEnd);
            $("#reservation_status_timer").text(timeLeftBooking);
        });
    }

    reservationTimer(timerBookingEnd) {
        let countdownTimer = setInterval(function(){
        let dateNow = new Date().getTime();
        let timeElapse = timerBookingEnd - dateNow;
        console.log("timerBookingEnd = " + timerBookingEnd + " DateNow = " + dateNow)
        console.log("TimeElapse = " + timeElapse);
            if (timeElapse >= 0) {
                let minutes = Math.floor((timeElapse % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeElapse % (1000 * 60)) / 1000);
                console.log(minutes + " minutes " + seconds + " secondes");
            } else {
                clearInterval(countdownTimer);
                console.log("BookingExpired")
            } 
        }, 1000) 
        // console.log(timerBookingStart);
        // let timerBookingEnd = timerBookingStart + (20 * 60);
        // console.log(timerBookingStart, timerBookingEnd);
        // let timerCountdown = setInterval(function() {
        //     let timerElapse = timerBookingEnd - timerBookingStart
        //     console.log(timerElapse)
        //     let minutes = Math.floor(timerElapse / 60);
        //     let seconds = Math.floor((timerElapse % 60));
        //     console.log(minutes + " minutes" + seconds + "seccondes");

        // }, 1000);
        // let dateNow = Date.now();
        // console.log(timerBookingStart, dateNow)
        // let maxBookingTimer = 1200;
        // let timeElapse = dateNow - timerBookingStart;
        // if (timeElapse === maxBookingTimer) {
        //     console.log("Booking expired");
        // } else {
        //     setInterval(function(){
        //         let minutes = Math.floor(maxBookingTimer / 60);
        //         let seconds = Math.floor((maxBookingTimer % 60));
        //         console.log(minutes + " minutes " + seconds + " seccondes");
        //         maxBookingTimer--;
        //     }, 1000)
        // }
    }

    // userBookingStorage(stationData) {
    //     $("#reservation_canvas_access_button").click((event) => { 
    //         event.preventDefault()
    //         if ($("#first_name").val() != "" && $("#last_name").val() != "") {   
    //             let userIdentity = {
    //                 userFirstName: $("#first_name").val(),
    //                 userLastName: $("#last_name").val()
    //                 };
    //             $("#canvas").show()    
    //             $("#signature_canvas").css("display", "block");
    //             localStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
    //             sessionStorage.setItem("stationName", stationData.name);
    //             console.log(userIdentity.userFirstName, userIdentity.userLastName);
    //             $("#reservation_canvas_access_button").fadeOut("fast");
    //             $(".alert_canvas").show("slow")
    //         } else {
    //             console.log("Alert Error")
    //             $(".alert").show("slow");
                // $("body").click(function() {
                //     $(".alert").hide("slow");
                // })
            // }
            // $("#confirm_canvas").click(() => {
                // $("#reservation_status_text").text($("#last_name").val() + " " + $("#first_name").val() + " vous avez effectué la réservation d'un vélo à la station " 
                //                                     + stationData.name +". Celle-ci sera valable pendant 20 min !");
                // this.reservationTimer(this.timerDuration);
                // $("form").hide();
                // $("#canvas").hide();
                // $("#signature_canvas").css("display", "none");
                // $("#user_booking_form").hide();
                // $("#reservation_status").show();
                // $("#confirm_canvas").hide();
                // $("#clear_canvas").hide();
        //         this.bookingStart = true;
        //         console.log(this.bookingStart);
        //     });
        // });
        // $("#first_name").focus(function(){
        //     $(".alert").hide("slow");
        // });
        // $("#last_name").focus(function(){
        //     $(".alert").hide("slow");
        // });
        // $(window).click(function(){
        //     $(".alert").alert("close");
        // })
    // }

    // userBookingSummary() {
    //     // console.log(this.bookingStart)
    //     // if (this.bookingStart) {
    //         console.log("Un utilisateur est enregistré")
    //         let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
    //         let userBookingStation = sessionStorage.getItem("stationName")
    //         let userBookingTimer = sessionStorage.getItem("timerBookingCountdown")
    //         console.log(userBookingStation);
    //         $("#first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
    //         $("#last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
    //         // $("#reservation_button").focus(function() {
    //         //     $(this).css("background-color", "green");
    //         // })
    //         $("#user_summary_details").show();
    //         $("#reservation_cancel_summary").show();
    //         $("#user_first_name").text(userIdentity.userFirstName);
    //         $("#user_last_name").text(userIdentity.userLastName);
    //         $("#user_booking_station_name").text(userBookingStation);
            // $("#user_summary_details").text(userIdentity.userFirstName + " " + userIdentity.userLastName + " vous avez effectué la réservation d'un vélo à la station " 
            //                                         + userBookingStation + " Cette réservation est encore valable " + userBookingTimer + " Souhaitez-vous annulez ?");
            // $("form").hide();
        // } else {
            // $("#user_summary_details").show();
        //     $("#reservation_cancel_summary").hide();
        // }
        //     bookingSummary
        // } else {
        //     cancelBooking
        // }

    // }
    
    // userBookingStatus(stationData) {
    //     $("#user_summary_details").hide();
    //     if (localStorage.getItem("UserIdentity")) {
    //         // console.log(stationData)
    //         this.userBookingSummary()
    //     } else {
    //         this.userBookingStorage(stationData);
    //         // $("#reservation_confirm").hide();
    //     }
    // }
    
    // cancelBooking() {
    //     $("#first_name").val("");
    //     $("#last_name").val("");
    //     let userBookingStation = sessionStorage.getItem("stationName")
    //     console.log(userBookingStation)
    //     $("#reservation_status_text").text("Votre réservation à la station " + userBookingStation + " a été annulé");
    //     $("#user_summary_details").hide();
    //     setInterval(function() {sessionStorage.removeItem("stationName")}, 1000);
    // }
    
    // reservationTimer(timerDuration) {
    //     // let bookingMilli = Date.now()
    //     // let bookingDate = Date(Date.now())
    //     // console.log("Current date =" + bookingDate)
    //    console.log(timerDuration);
    //    this.bookingTimer = setInterval (() => {
    //         let minutes = Math.floor(timerDuration / 60);
    //         let seconds = Math.floor(timerDuration % 60);
    //         $("#reservation_status_timer").text(minutes + ":" + seconds);
    //         let timerCountdown = $("#reservation_status_timer").text();
    //         // console.log(timerCountdown);
    //         if (timerDuration > 0){
    //             timerDuration --;
    //             sessionStorage.setItem("timerBookingCountdown", timerCountdown);
    //         } else {
    //             this.cancelBooking();
    //         }
    //    }, 1000);
    // }

    // reservationTimer() {
    //     let oneMinuteTimer = 10;
    //     // console.log(this.bookingTimer)
    //     let timer = setInterval(() => {
    //         if (oneMinuteTimer > 0) {
    //             console.log(oneMinuteTimer)
    //             oneMinuteTimer --;
    //             $("#reservation_status_timer").text(oneMinuteTimer);
    //         } else {
    //             clearInterval(timer);
    //             $("#reservation_status_timer").text("Le temps est expiré !");
    //             // this.cancelBooking(this);
    //         }
    //     }, 1000);
    // }

        // setInterval(() => {
        //     if (oneMinuteTimer > 0) {
        //         console.log(oneMinuteTimer)
        //         oneMinuteTimer --;
        //         $("#reservation_status_timer").text(oneMinuteTimer);
        //     } else {
        //         clearInterval(timer);
        //         $("#reservation_status_timer").text("Le temps est expiré !");
        //         // this.cancelBooking(this);
        //     }
        // }, 1000);

    // userBookingStatus(stationData) {
        //     if (localStorage.getItem("UserIdentity")) {
            //         $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
            //                                             Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
            //                                             Souhaitez-vous annulez ?`);
    //         $("form").hide();
    //         $("#reservation_cancel").show();
    //         seesionStorage.setItem("Station Name", sataion)
    //     } else {
    //         $("#reservation_confirm").hide();
    //         $("#confirm_canvas").click( () => {
    //             $("#reservation_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez effectué la réservation d'un vélo à la station ${stationData.name}. Celle-ci est valable pendant 20 min !`);
    
    //             this.reservationTimer();
    //             $("form").hide();
    //             $("#signature_canvas").css("display", "none");
    //             $("#confirm_canvas").hide();
    //             $("#clear_canvas").hide();
    //         });
    //     }
    // }

    // userSummaryBooking(stationData) {
    //     if (localStorage.getItem("UserIdentity")) {
    //         console.log("Reservation Summary")
    //         $("#user_summary_details").show();
    //         $("#user_summary_details").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
    //                                             Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
    //                                             Souhaitez-vous annulez ?`);
    //         $("#reservation_cancel").show();
    //     }
    // }

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

}