class Booking {
    constructor() {
        // this.displayBookingForm();
        // this.formVerification();
        if (this.refreshPage) {

        }
        this.existingUser();
        // this.bookingTimeLeft();
        // $(window).on("load", this.bookingTimeLeft.bind(this));
        $("#cancel_booking").click(this.cancelBooking.bind(this));
        $("#booking_canvas_access_button").click(this.formVerification.bind(this));
        $("#booking_summary_button").click(this.displayBookingSummary.bind(this));
        $("#booking_access_button").click(this.existingUser.bind(this));
        this.maxBookingTimer = 31000;
        this.intervalTimer;
        // this.intervalTimer = setInterval(this.bookingTimeLeft.bind(this), 1000);
    }

    displayBookingForm() {
            console.log("displayBookingForm");
            $("#booking_access_button").attr("disabled", "disabled");
            $("#booking_alert").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info").show();
            $("#booking_alert_title").html("Enregistrement d'une réservation !");
            $("#booking_alert_text").html("");
            $("#booking_alert_info").html("Pour effectuer une réservation, merci de renseigner votre <span>Nom</span> et <span>Prénom</span> dans le formulaire ci-dessous.");
            $("#user_booking_form").show();
            $("#booking_summary_button").hide();
            $("#alert_return_map_button").click(() => {
                $("#booking_access_button").removeAttr("disabled");
                $("#booking_alert").hide();
                $("#user_booking_form").hide();
            });
            // this.bookingInProgress();
    }

    displayBookingSummary() {
        console.log("displayBookingSummary");
        $("#user_booking_summary").fadeIn("slow");
        $("#user_booking_summary_text").html("Un vélo vous est réservé sur la station <span id=booking_station_name_summary></span> !");
        $("#user_booking_summary_timer").html("Temps restants : <span id=booking_timer></span>");
        $("#booking_station_name_summary").text(sessionStorage.stationBookingName);
        // this.bookingTimeLeft();
        $("#booking_access_button").removeAttr("disabled");
    }

    formVerification() {
        // $("#booking_canvas_access_button").click((event) => {
            // event.preventDefault();
            // $("#booking_canvas_access_button").show();
            // console.log("Click valider Form")
            // $("#booking_access_button").scrollTo(function() {
            //     $("#form_first_name").focus();
            // });
            console.log("formVerification");
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() === "") {
                $("#booking_alert").removeClass("alert-warning").addClass("alert-danger").show("slow").html("<strong>Attention !</strong> Aucun <strong>Nom</strong> et <strong>Prénom</strong> n'a été renseignés !");  
            }
            if ($("#form_first_name").val() === "" && $("#form_last_name").val() != "") {
                $("#alert").removeClass("alert-danger").addClass("alert-warning").show("slow").html("<strong>Attention !</strong> Votre <strong>Prénom</strong> n'est pas renseigné !");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() === "") {
                $("#alert").removeClass("alert-danger").addClass("alert-warning").show("slow").html("<strong>Attention !</strong> Votre <strong>Nom</strong> n'est pas renseigné !");
            } 
            if ($("#form_first_name").val() != "" && $("#form_last_name").val() != "") {
                $("#alert").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info").show("slow").html("Pour <strong>valider</strong> votre réservation, merci d'aposer votre <strong>signature</strong> dans le cadre ci-dessous :");
                $("#canvas").show();
                $("#signature_canvas").css("display", "block").fadeIn("slow");               
                $("#booking_canvas_access_button").fadeOut("fast");
                // $("#user_booking_form").hide();
                // $("#booking_access_button").removeAttr("disabled");
            }
        // });
        $("#form_first_name").focus(function(){
            $("#alert").hide("slow"); 
        });
        $("#form_last_name").focus(function() {
            $("#alert").hide("slow");
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
            $("#booking_alert").removeClass("alert-danger").removeClass("alert-info").addClass("alert-success");
            $("#booking_alert_title").html("Réservation effectuée ! ");
            $("#booking_alert_text").html("");
            $("#booking_alert_info").html("Cette réservation est valable pour une durée de <span>20 minutes</span>, passé ce délai elle sera <span>automatiquement annulé</span>.")
            $("#booking_station_name_storage").text(sessionStorage.stationBookingName);
            $("#booking_summary_button").show();
            $("#alert_return_map_button").hide();
            this.bookingTimeLeft();
            $("#return_button_description").show();
            $("#return_to_global_map").show();
            $("#canvas").hide();
            $("#alert").hide();
            $("#user_booking_form").hide();
            $("#booking_summary_button").click(() => {
                this.displayBookingSummary();
                $("#booking_alert").removeClass("alert-success").fadeOut("slow");
                $("#booking_summary_button").hide();
            });   
            // let timeLeftBooking = 
            // this.reservationTimer(timerBookingEnd);
            // $("#reservation_status_timer").text(timeLeftBooking);
        });
    }

    existingUser() {
        console.log("existingUser");
        if (localStorage.getItem("UserIdentity")) {
            if (!sessionStorage.startBookingTime) {
                console.log("U et NON T")
                let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
                $("#form_first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
                $("#form_last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
                $("#booking_access_button").removeAttr("disabled");
                $("#booking_access_button").click(() => {
                    this.displayBookingForm();
                     });
            } else {
                console.log(sessionStorage.startBookingTime);
                $("#booking_access_button").removeAttr("disabled");
                console.log("U et T")
                $("#booking_access_button").click( () => {
                    this.bookingInProgress();
                });
                this.displayBookingSummary();                
            }
        } else {
            console.log("NON U et NON T")
            $("#booking_access_button").click( () => {
                $("#booking_access_button").attr("disabled", "disabled");
                this.displayBookingForm();
            });
        }
    }

    bookingInProgress() {
        console.log("bookingInProgress")
        // $("#booking_access_button").click( () => {            
            if (sessionStorage.stationBookingName === sessionStorage.currentClickedStationName) {
                // console.log("Click bookingInProgress")
                // console.log(sessionStorage.stationBookingName, sessionStorage.currentClickedStationName);
                $("#booking_alert").removeClass("alert-danger").removeClass("alert-warning").removeClass("alert-success").addClass("alert-info").show();
                $("#booking_alert_title").html("Vous avez une réservation sur cette Station!");
                $("#booking_alert_text").html("");
                $("#booking_alert_info").html("");
                $("#alert_return_map_button").show();  
                $("#keep_booking_button").hide();
                $("#new_booking_button").hide();
                $("#user_booking_form").hide();
                $("#alert_return_map_button").click(()=>{
                    $("#booking_alert").hide();
                });
                this.displayBookingSummary();
            } else { 
                $("#user_booking_summary").hide();
                $("#user_booking_form").hide();
                $("#booking_alert").removeClass("alert-danger").removeClass("alert-info").removeClass("alert-success").addClass("alert-warning").show();
                $("#booking_alert_title").html("Réservation en cours !");
                $("#booking_alert_text").html("Vous avez déjà un vélo réservé sur la station <span id=booking_station_name_storage></span>.");
                $("#booking_alert_info").html("<span>Attention !</span> Si vous effectué une nouvelle réservation sur la station <span id=current_clicked_station_name></span>, la précédente sera automatiquement <span>ANNULÉ !</span>")
                $("#booking_station_name_storage").text(sessionStorage.stationBookingName);
                $("#current_clicked_station_name").text(sessionStorage.currentClickedStationName);
                $("#alert_return_map_button").show();  
                $("#keep_booking_button").show();
                $("#new_booking_button").show();
                $("#keep_booking_button").click(() => {
                    this.displayBookingSummary();
                    $("#booking_alert").removeClass("alert-warning").hide();
                    $("#return_to_global_map").show();
                });
                $("#new_booking_button").click(() => {
                    $("#booking_access_button").attr("disabled", "disabled");
                    this.cancelBooking();
                    setTimeout(() => {
                        $("#booking_alert").removeClass("alert-warning").removeClass("alert-danger").hide();
                        this.existingUser();
                        this.displayBookingForm();
                    }, 5000);
                    $("#keep_booking_button").hide();
                    $("#new_booking_button").hide();
                });
                $("#alert_return_map_button").click(()=>{
                    // console.log("Click alert return map button");
                    this.displayBookingSummary();
                    $("#booking_alert").hide();
                    $("user_booking_form").hide();
                });
            }        
        // });
    }

    cancelBooking() {
        console.log("cancelBooking");
        sessionStorage.removeItem("stationBookingName");
        sessionStorage.removeItem("startBookingTime");
        $("#user_booking_summary").hide();
        $("#booking_alert").removeClass("alert-info").removeClass("alert-success").addClass("alert-danger").show();
        $("#booking_alert_title").html("Votre Réservation a été annulé !");
        $("#booking_alert_info").html("Vous pouvez refaire une réservation en sélectionnant une station !");
        $("#booking_alert_text").html("");
        $("#alert_return_map_button").show().click(() => {
            $("#booking_alert").hide();
        });
        this.stopTimer();
    }

    timerConversion(timeLeft) {
        console.log("timerConversion")
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + " : " + seconds
    }

    bookingTimeLeft() {
        console.log("bookingTimeLeft");
        // let maxBookingTimer = 31000;
        let startBookingTime = new Date(sessionStorage.getItem("startBookingTime"));
        this.intervalTimer = setInterval( e => {
            let dateNow = new Date();
            let timeLeft = (dateNow - startBookingTime);
            console.log(timeLeft); 
            if (timeLeft > this.maxBookingTimer) {
                console.log(this.maxBookingTimer);
                console.log("If bookingTimeLeft");
                // clearInterval(this.intervalTimer);
                // this.stopTimer();
                this.cancelBooking(); 
            } else {
                console.log(this.maxBookingTimer);

                console.log("Else bookingTimeLeft")
                $("#booking_timer").html(this.timerConversion(timeLeft));
            }
        }, 1000);
    }

    stopTimer() {
        console.log("stopTimer");
        clearInterval(this.intervalTimer);
    }

}
        // let dateNow = new Date();
        // console.log(dateNow.getMinutes());
        // console.log(dateNow - startBookingTime)
        // let timeLeft = (dateNow.getMinutes() - startBookingTime.getMinutes()) ; 
        // if (timeLeft > maxBookingTimer) {
        //     console.log("Réservation expiré");
        // } else {
        //     let interval = setInterval(e => {
        //         this.timerConversion(timeLeft)
        //     }, 1000);
        // }
        // let timeLeft = dateNow - startBookingTime;
        // console.log(timeLeft);

    // bookingTimer(timerBookingEnd) {
    //     let countdownTimer = setInterval(function(){
    //         let dateNow = new Date().getTime();
    //         let timeElapse = timerBookingEnd - dateNow;
    //         console.log("timerBookingEnd = " + timerBookingEnd + " DateNow = " + dateNow)
    //         console.log("TimeElapse = " + timeElapse);
    //             if (timeElapse >= 0) {
    //                 let minutes = Math.floor((timeElapse % (1000 * 60 * 60)) / (1000 * 60));
    //                 let seconds = Math.floor((timeElapse % (1000 * 60)) / 1000);
    //                 console.log(minutes + " minutes " + seconds + " secondes");
    //                 $("#booking_status_timer").text(minutes + " minutes " + seconds + " secondes");
    //             } else {
    //                 clearInterval(countdownTimer);
    //                 console.log("BookingExpired")
    //             } 
    //     }, 1000) 
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
    // }


    
    // existingUser() {
    //     if (localStorage.getItem("UserIdentity") && !(sessionStorage.startBookingTime)) {
    //         let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
    //         // let userBookingStation = sessionStorage.getItem("stationBookingName");
    //         $("#form_first_name").val(userIdentity.userFirstName).css("background-color", "rgba(0, 255, 84, 0.2)");
    //         $("#form_last_name").val(userIdentity.userLastName).css("background-color", "rgba(0, 255, 84, 0.2)");
    //         $("#booking_access_button").removeAttr("disabled");

    //         this.bookingInProgress();
    //         // this.displayBookingSummary();
    //         // $("#user_booking_summary").show();
    //         // $("#booking_status").show();
    //         // $("#booking_station_name_summary").text(userBookingStation);
    //         // $("#erase_and_new_booking").click(function(){
    //         //     $("form").fadeIn("slow");
    //         //     $("#user_with_booking").hide("slow");
    //         // })
    //     } if (localStorage.getItem("UserIdentity") && sessionStorage.startBookingTime) {
    //         // $("#booking_access_button").click( () => {
    //         $("#booking_access_button").attr("disabled", "disabled");
    //         this.displayBookingForm();
    //         // });
    //     }
    // }
    // userBookingStorage(stationData) {
    //     $("#booking_canvas_access_button").click((event) => { 
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
    //             $("#booking_canvas_access_button").fadeOut("fast");
    //             $(".alert_canvas").show("slow")
    //         } else {
    //             console.log("Alert Error")
    //             $(".alert").show("slow");
                // $("body").click(function() {
                //     $(".alert").hide("slow");
                // })
            // }
            // $("#confirm_canvas").click(() => {
                // $("#booking_status_text").text($("#last_name").val() + " " + $("#first_name").val() + " vous avez effectué la réservation d'un vélo à la station " 
                //                                     + stationData.name +". Celle-ci sera valable pendant 20 min !");
                // this.bookingTimer(this.timerDuration);
                // $("form").hide();
                // $("#canvas").hide();
                // $("#signature_canvas").css("display", "none");
                // $("#user_booking_form").hide();
                // $("#booking_status").show();
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
    //         // $("#booking_button").focus(function() {
    //         //     $(this).css("background-color", "green");
    //         // })
    //         $("#user_summary_details").show();
    //         $("#booking_cancel_summary").show();
    //         $("#user_first_name").text(userIdentity.userFirstName);
    //         $("#user_last_name").text(userIdentity.userLastName);
    //         $("#user_booking_station_name").text(userBookingStation);
            // $("#user_summary_details").text(userIdentity.userFirstName + " " + userIdentity.userLastName + " vous avez effectué la réservation d'un vélo à la station " 
            //                                         + userBookingStation + " Cette réservation est encore valable " + userBookingTimer + " Souhaitez-vous annulez ?");
            // $("form").hide();
        // } else {
            // $("#user_summary_details").show();
        //     $("#booking_cancel_summary").hide();
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
    //         // $("#booking_confirm").hide();
    //     }
    // }
    
    // cancelBooking() {
    //     $("#first_name").val("");
    //     $("#last_name").val("");
    //     let userBookingStation = sessionStorage.getItem("stationName")
    //     console.log(userBookingStation)
    //     $("#booking_status_text").text("Votre réservation à la station " + userBookingStation + " a été annulé");
    //     $("#user_summary_details").hide();
    //     setInterval(function() {sessionStorage.removeItem("stationName")}, 1000);
    // }
    
    // bookingTimer(timerDuration) {
    //     // let bookingMilli = Date.now()
    //     // let bookingDate = Date(Date.now())
    //     // console.log("Current date =" + bookingDate)
    //    console.log(timerDuration);
    //    this.bookingTimer = setInterval (() => {
    //         let minutes = Math.floor(timerDuration / 60);
    //         let seconds = Math.floor(timerDuration % 60);
    //         $("#booking_status_timer").text(minutes + ":" + seconds);
    //         let timerCountdown = $("#booking_status_timer").text();
    //         // console.log(timerCountdown);
    //         if (timerDuration > 0){
    //             timerDuration --;
    //             sessionStorage.setItem("timerBookingCountdown", timerCountdown);
    //         } else {
    //             this.cancelBooking();
    //         }
    //    }, 1000);
    // }

    // bookingTimer() {
    //     let oneMinuteTimer = 10;
    //     // console.log(this.bookingTimer)
    //     let timer = setInterval(() => {
    //         if (oneMinuteTimer > 0) {
    //             console.log(oneMinuteTimer)
    //             oneMinuteTimer --;
    //             $("#booking_status_timer").text(oneMinuteTimer);
    //         } else {
    //             clearInterval(timer);
    //             $("#booking_status_timer").text("Le temps est expiré !");
    //             // this.cancelBooking(this);
    //         }
    //     }, 1000);
    // }

        // setInterval(() => {
        //     if (oneMinuteTimer > 0) {
        //         console.log(oneMinuteTimer)
        //         oneMinuteTimer --;
        //         $("#booking_status_timer").text(oneMinuteTimer);
        //     } else {
        //         clearInterval(timer);
        //         $("#booking_status_timer").text("Le temps est expiré !");
        //         // this.cancelBooking(this);
        //     }
        // }, 1000);

    // userBookingStatus(stationData) {
        //     if (localStorage.getItem("UserIdentity")) {
            //         $("#booking_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
            //                                             Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
            //                                             Souhaitez-vous annulez ?`);
    //         $("form").hide();
    //         $("#booking_cancel").show();
    //         seesionStorage.setItem("Station Name", sataion)
    //     } else {
    //         $("#booking_confirm").hide();
    //         $("#confirm_canvas").click( () => {
    //             $("#booking_status_text").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez effectué la réservation d'un vélo à la station ${stationData.name}. Celle-ci est valable pendant 20 min !`);
    
    //             this.bookingTimer();
    //             $("form").hide();
    //             $("#signature_canvas").css("display", "none");
    //             $("#confirm_canvas").hide();
    //             $("#clear_canvas").hide();
    //         });
    //     }
    // }

    // userSummaryBooking(stationData) {
    //     if (localStorage.getItem("UserIdentity")) {
    //         console.log("booking Summary")
    //         $("#user_summary_details").show();
    //         $("#user_summary_details").text(`${$("#last_name").val()} ${$("#first_name").val()}, vous avez déjà une réservation en cours sur la station ${stationData.name}.
    //                                             Elle est encore valable "AFFICHAGE DU TEMPS RESTANT".
    //                                             Souhaitez-vous annulez ?`);
    //         $("#booking_cancel").show();
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
                //     $("#booking_status_text").text("Merci de renseigner votre Prénom ! ");
                // } if ($("#last_name").val() === "") {
                //     $("#booking_status_text").text("Merci de renseigner votre Nom ! ");
                // } 
                // $("#booking_status_text").text("Pour valider votre réservation, merci d'aposer votre signature, dans le cadre suivant :");
                // $("#signature_canvas").css("display", "block");
                // $("#booking_confirm").show();
                // $("#booking_cancel").show();
                // }
            // else {
                // $("#booking_status_text").text("Les champs Prénom et Nom sont obligatoires ! ");
            // }
        // })                

// }