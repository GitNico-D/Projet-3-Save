class Canvas {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.context = this.canvasId.getContext("2d");
    this.context.lineWidth = "1";
    this.context.lineJoin = "round";
    this.context.strokeStyle = "black";
    this.startSignature = false;
    this.signaturePoints = 0;
    this.canvasDimensions();
    $("#signature_canvas").mousedown(this.mouseDown.bind(this));
    $("#signature_canvas").mousemove(this.mouseMove.bind(this));
    $("#signature_canvas").mouseup(this.mouseUp.bind(this));
    $("#signature_canvas").on("touchstart", this.touchStart.bind(this));
    $("#signature_canvas").on("touchmove", this.touchMove.bind(this));
    $("#signature_canvas").on("touchend", this.touchEnd.bind(this));
    $("#clear_canvas").click(this.clearCanvas.bind(this));
    $("#confirm_canvas").click(this.clearCanvas.bind(this));
  }

  canvasDimensions() {
    if (window.innerWidth < 480) {
      this.canvasId.width = 250;
    } else {
      this.canvasId.width = 500;
    }
  }

  signatureValidation() {
    $("#confirm_canvas").toggleClass("hide", false);
    $("#clear_canvas").toggleClass("hide", false);
    $("#clear_canvas").click(function() {
      $("#confirm_canvas").toggleClass("hide", true);
      $("#clear_canvas").toggleClass("hide", true);
      $("#alert")
        .removeClass("alert-danger")
        .removeClass("alert-warning")
        .addClass("alert-info")
        .html(
          "Pour <span class=font-bold>valider</span> votre réservation, merci d'aposer votre <span class=font-bold>signature</span> dans le cadre ci-dessous :"
        );
      this.signaturePoints = 0;
    });
  }

  mouseDown() {
    this.startSignature = true;
    this.context.moveTo(event.offsetX, event.offsetY);
    this.context.beginPath();
  }

  mouseMove() {
    if (this.startSignature === true) {
      this.context.lineTo(event.offsetX, event.offsetY);
      this.context.stroke();
      this.signaturePoints++;
    }
  }

  mouseUp() {
    this.startSignature = false;
    if (this.signaturePoints > 100) {
      this.signatureValidation();
    } else {
      $("#alert")
        .removeClass("alert-info")
        .addClass("alert-warning")
        .html(
          "Désolé mais votre <span>signature</span> est trop <span class=font-bold>courte</span>, merci de recommencer."
        );
    }
  }

  touchStart() {
    event.preventDefault();
    let rect = this.canvasId.getBoundingClientRect();
    this.startSignature = true;
    this.context.moveTo(
      event.touches[0].clientX - rect.left,
      event.touches[0].clientX - rect.top
    );
    this.signaturePoints++;
    this.context.beginPath();
  }

  touchMove() {
    event.preventDefault();
    let rect = this.canvasId.getBoundingClientRect();
    if (this.startSignature === true) {
      this.context.lineTo(
        event.touches[0].clientX - rect.left,
        event.touches[0].clientY - rect.top
      );
      this.context.stroke();
      this.signaturePoints++;
    }
  }

  touchEnd() {
    event.preventDefault();
    this.startSignature = false;
    if (this.signaturePoints > 100) {
      this.signatureValidation();
    } else {
      $("#alert")
        .removeClass("alert-info")
        .addClass("alert-warning")
        .html(
          "Désolé mais votre <span>signature</span> est trop <span>courte</span>, merci de recommencer."
        );
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasId.width, this.canvasId.height);
    $("#confirm_canvas").toggleClass("hide", true);
    $("#clear_canvas").toggleClass("hide", true);
    this.signaturePoints = 0;
  }
}
