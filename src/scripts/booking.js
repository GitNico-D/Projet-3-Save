let maxBookingTimer = 1201;

class Booking {
  constructor() {
    this.intervalTimer = null;
    this.stationBookingName;
    this.stationAvailableBikesStands;
    this.stationAvailableBikes;
    this.startBookingTime;
    if (sessionStorage.startBookingTime) {
      sessionStorage.removeItem("currentClickedStationName");
      $("#booking_link")
        .removeClass("text-danger")
        .addClass("text-success")
        .html("Votre Réservation");
      this.displayBookingSummary();
      this.bookingTimeLeft();
    } else {
      $("#booking_link")
        .removeClass("text-success")
        .addClass("text-danger")
        .html("Aucune Réservation");
      $("#booking_access_button").click(() => {
        this.displayBookingForm();
      });
    }
    this.existingUser();
    $("#booking_access_button").click(this.displayBookingForm.bind(this));
    $("#booking_in_progress_button").click(this.bookingInProgress.bind(this));
    $("#cancel_booking").click(() => {
      clearInterval(this.intervalTimer);
      this.cancelBooking();
    });
    $("#booking_canvas_access_button").click(this.formVerification.bind(this));
    $("#confirm_canvas").click(() => {
      this.userBookingStorage();
      this.displayBookingSummary();
    });
    $("#confirm_canvas").click(this.bookingTimeLeft.bind(this));
    $("#keep_booking_button").click(() => {
      this.displayBookingSummary();
      this.resetDisplayBooking();
    });
    $("#booking_return_to_map_button").click(
      this.resetDisplayBooking.bind(this)
    );
    $("#alert_return_map_button").click(() => {
      this.resetDisplayBooking();
    });
    $("#new_booking_button").click(() => {
      clearInterval(this.intervalTimer);
      this.cancelBooking();
    });
  }

  displayBookingForm() {
    $("#booking_access_button").addClass("isDisabled").removeClass("enabled").attr("href", "#booking_alert");
    $("#booking_canvas_access_button").toggleClass("hide", false);
    $("#booking_return_to_map_button").toggleClass("hide", false);
    $("#booking_alert")
      .toggleClass("hide", false)
      .removeClass("alert-danger")
      .removeClass("alert-warning")
      .addClass("alert-info");
    $("#booking_alert_title").html("Enregistrement d'une réservation !");
    $("#booking_alert_text").html("");
    $("#booking_alert_info").html(
      "Pour effectuer une réservation, merci de renseigner vos <span class=font-bold>Nom</span> et <span class=font-bold>Prénom</span> dans le formulaire ci-dessous."
    );
    $("#user_booking_form").toggleClass("hide", false);
  }

  displayBookingSummary() {
    $("#user_booking_summary").toggleClass("hide", false);
    $("#user_booking_summary_text").html(
      "Un vélo vous est réservé sur la station <span id=booking_station_name_summary class=font-bold></span> !"
    );
    $("#user_booking_summary_timer").html(
      "<div id=loader class=loader hide><div>"
    );
    setTimeout(() => {
      $("#loader").addClass("hide");
      $("#user_booking_summary_timer").html(
        "Temps restant : <span id=booking_timer class=user-booking-summary-timer></span>"
      );
    }, 1000);
    $("#booking_station_name_summary").text(sessionStorage.stationBookingName);
    $("#booking_access_button").removeClass("isDisabled").removeAttr("href", "#booking_alert");
    $("#booking_link")
      .toggleClass("hide", false)
      .removeClass("text-danger")
      .addClass("text-success")
      .html("Votre Réservation");
  }

  formVerification() {
    if (
      $("#form_first_name").val() === "" &&
      $("#form_last_name").val() === ""
    ) {
      $("#alert")
        .fadeIn("slow")
        .removeClass("alert-warning")
        .addClass("alert-danger")
        .toggleClass("hide", false)
        .html(
          "<strong>Attention !</strong> Aucun <strong>Nom</strong> et <strong>Prénom</strong> n'a été renseignés !"
        );
    }
    if (
      $("#form_first_name").val() === "" &&
      $("#form_last_name").val() != ""
    ) {
      $("#alert")
        .fadeIn("slow")
        .removeClass("alert-danger")
        .addClass("alert-warning")
        .toggleClass("hide", false)
        .html(
          "<strong>Attention !</strong> Votre <strong>Prénom</strong> n'est pas renseigné !"
        );
    }
    if (
      $("#form_first_name").val() != "" &&
      $("#form_last_name").val() === ""
    ) {
      $("#alert")
        .fadeIn("slow")
        .removeClass("alert-danger")
        .addClass("alert-warning")
        .toggleClass("hide", false)
        .html(
          "<strong>Attention !</strong> Votre <strong>Nom</strong> n'est pas renseigné !"
        );
    }
    if ($("#form_first_name").val() != "" && $("#form_last_name").val() != "") {
      $("#alert")
        .toggleClass("hide", false)
        .removeClass("alert-danger")
        .removeClass("alert-warning")
        .addClass("alert-info")
        .html(
          "Pour <strong>valider</strong> votre réservation, merci d'aposer votre <strong>signature</strong> dans le cadre ci-dessous :"
        );
      $("#canvas").toggleClass("hide", false);
      $("#signature_canvas")
        .css("display", "block")
        .fadeIn("slow");
      $("#booking_canvas_access_button").toggleClass("hide", true);
      $("#booking_return_to_map_button").toggleClass("hide", true);
    }
    $("#form_first_name").focus(function() {
      $("#alert").toggleClass("hide", true);
    });
    $("#form_last_name").focus(function() {
      $("#alert").toggleClass("hide", true);
    });
  }

  stationInfos(stationData) {
    this.stationBookingName = stationData.name;
    this.stationAvailableBikesStands =
      stationData.totalStands.availabilities.stands;
    this.stationAvailableBikes = stationData.totalStands.availabilities.bikes;
  }

  userBookingStorage() {
    event.preventDefault();
    let userIdentity = {
      userFirstName: $("#form_first_name").val(),
      userLastName: $("#form_last_name").val()
    };
    localStorage.setItem("UserIdentity", JSON.stringify(userIdentity));
    this.startBookingTime = new Date();
    sessionStorage.setItem("startBookingTime", this.startBookingTime);
    sessionStorage.setItem("stationBookingName", this.stationBookingName);
    sessionStorage.setItem(
      "stationAvailableBikesStands",
      this.stationAvailableBikesStands
    );
    sessionStorage.setItem("stationAvailableBikes", this.stationAvailableBikes);
    sessionStorage.stationAvailableBikesStands++;
    sessionStorage.stationAvailableBikes--;
    $("#infos_station_available_bikes_stand").text(
      sessionStorage.stationAvailableBikesStands
    );
    $("#infos_station_available_bikes").text(
      sessionStorage.stationAvailableBikes
    );
    $("#booking_alert")
      .toggleClass("hide", false)
      .removeClass("alert-danger")
      .removeClass("alert-info")
      .addClass("alert-success");
    $("#booking_alert_title").html("Réservation effectuée ! ");
    $("#booking_alert_text").html("");
    $("#booking_alert_info").html(
      "Cette réservation est valable pour une durée de <span class=font-bold>20 minutes</span>, passé ce délai elle sera <span class=font-bold>automatiquement annulée</span>."
    );
    $("#user_booking_form").toggleClass("hide", true);
    setTimeout(() => {
      $("#booking_alert").toggleClass("hide", true);
    }, 5000);
    $("#booking_in_progress_button")
      .toggleClass("hide", false)
      .removeClass("btn-primary")
      .addClass("btn-info");
  }

  existingUser() {
    if (localStorage.getItem("UserIdentity")) {
      let userIdentity = JSON.parse(localStorage.getItem("UserIdentity"));
      $("#form_first_name")
        .val(userIdentity.userFirstName)
        .css("background-color", "rgba(0, 255, 84, 0.2)");
      $("#form_last_name")
        .val(userIdentity.userLastName)
        .css("background-color", "rgba(0, 255, 84, 0.2)");
    } else {
      $("#booking_link")
        .toggleClass("hide", true)
        .removeClass("text-success")
        .removeClass("text-danger");
    }
  }

  bookingInProgress() {
    if (
      sessionStorage.stationBookingName ===
      sessionStorage.currentClickedStationName
    ) {
      $("#booking_alert")
        .toggleClass("hide", false)
        .removeClass("alert-danger")
        .removeClass("alert-warning")
        .removeClass("alert-success")
        .addClass("alert-info");
      $("#booking_alert_title").html(
        "Vous avez une réservation sur cette Station!"
      );
      $("#booking_alert_text").html("");
      $("#booking_alert_info").html("");
      $("#keep_booking_button").toggleClass("hide", true);
      $("#new_booking_button").toggleClass("hide", true);
      $("user_booking_form").toggleClass("hide", false);
      $("#alert_return_map_button").toggleClass("hide", false);
      $("#user_booking_summary").toggleClass("hide", false);
    } else {
      $("#booking_alert")
        .toggleClass("hide", false)
        .removeClass("alert-danger")
        .removeClass("alert-info")
        .removeClass("alert-success")
        .addClass("alert-warning");
      $("#booking_alert_title").html("Réservation en cours !");
      $("#booking_alert_text").html(
        "Vous avez déjà un vélo réservé sur la station <span id=booking_station_name_storage class=font-bold></span>."
      );
      $("#booking_alert_info").html(
        "<span class=font-bold>Attention !</span> Si vous effectuez une nouvelle réservation sur la station <span id=current_clicked_station_name class=font-bold></span>, la précédente sera automatiquement <span class=font-bold>ANNULÉE !</span>"
      );
      $("#booking_station_name_storage").text(
        sessionStorage.stationBookingName
      );
      $("#current_clicked_station_name").text(
        sessionStorage.currentClickedStationName
      );
      $("#keep_booking_button").toggleClass("hide", false);
      $("#new_booking_button").toggleClass("hide", false);
      $("#alert_return_map_button").toggleClass("hide", false);
      $("#user_booking_summary").toggleClass("hide", true);
    }
  }

  resetDisplayBooking() {
    $("#booking_alert").toggleClass("hide", true);
    $("#user_booking_form").toggleClass("hide", true);
    $("#booking_canvas_access_button").toggleClass("hide", true);
    $("#booking_return_to_map_button").toggleClass("hide", true);
    $("#booking_access_button").removeClass("isDisabled").addClass("enabled");
    $("#canvas").toggleClass("hide", true);
    $("#alert").toggleClass("hide", true);
    $("#alert_return_map_button").toggleClass("hide", true);
    $("#keep_booking_button").toggleClass("hide", true);
    $("#new_booking_button").toggleClass("hide", true);
  }

  cancelBooking() {
    $("#user_booking_summary").toggleClass("hide", true);
    $("#booking_alert")
      .removeClass("alert-info")
      .addClass("alert-danger")
      .toggleClass("hide", false);
    $("#booking_alert_title").html("Votre Réservation a été annulé !");
    $("#booking_alert_info").html(
      "Vous pouvez refaire une réservation en sélectionnant une station !"
    );
    $("#booking_alert_text").html("");
    sessionStorage.stationAvailableBikesStands--;
    sessionStorage.stationAvailableBikes++;
    $("#infos_station_available_bikes_stand").text(
      sessionStorage.stationAvailableBikesStands
    );
    $("#infos_station_available_bikes").text(
      sessionStorage.stationAvailableBikes
    );
    sessionStorage.clear();
    $("#alert_return_map_button").toggleClass("hide", true);
    $("#keep_booking_button").toggleClass("hide", true);
    $("#new_booking_button").toggleClass("hide", true);
    $("#user_booking_summary").toggleClass("hide", true);
    $(".booking_link")
      .removeClass("text-success")
      .addClass("text-danger")
      .html("Aucune Réservation");
    $("#alert_return_map_button").toggleClass("hide", false);
    $("#booking_access_button").toggleClass("hide", false);
    $("#booking_in_progress_button").toggleClass("hide", true);
    $("#booking_link")
      .removeClass("text-success")
      .removeClass("text-danger")
      .html("");
  }

  timerConversion(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = Math.floor(timeLeft - minutes * 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `<span> ${minutes} : ${seconds} </span>`;
  }

  bookingTimeLeft() {
    let startBookingTime = new Date(sessionStorage.getItem("startBookingTime"));
    this.intervalTimer = setInterval(e => {
      let dateNow = new Date();
      let timeDifference = dateNow - startBookingTime;
      if (timeDifference > maxBookingTimer * 1000) {
        clearInterval(this.intervalTimer);
        this.cancelBooking();
      } else {
        $("#booking_timer").html(
          this.timerConversion(maxBookingTimer - timeDifference / 1000)
        );
      }
    }, 1000);
  }
}
