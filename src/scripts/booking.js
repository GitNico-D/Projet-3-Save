class Booking {
    constructor() {
        // this.firstName = firstName;
        // this.lastName = lastName;
        this.displayBooking();
    }

    displayBooking() {
        $("#reservation_button").click(function() {
            $("#user_form_booking").show();

            console.log("Booking")
        })
    }
}