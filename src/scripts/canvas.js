class Canvas {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.context = this.canvasId.getContext("2d");
        this.context.lineWidth = "2";
        this.context.lineJoin = "round";
        this.context.strokeStyle = "black";
        this.startSignature = false;
        $("#signature_canvas").mousedown(this.mouseDown.bind(this));
        $("#signature_canvas").mousemove(this.mouseMove.bind(this));
        $("#signature_canvas").mouseup(this.mouseUp.bind(this));
        $("#signature_canvas").on("touchstart", this.touchStart.bind(this));
        $("#signature_canvas").on("touchmove", this.touchMove.bind(this));
        $("#signature_canvas").on("touchEnd", this.touchEnd.bind(this));
        $("#clear_canvas").click(this.clearCanvas.bind(this));
    }
    
    signatureValidation() {
        // console.log("Show Confirmation or Cancelation");
        $("#confirm_canvas").show().fadeIn(1000, "linear");
        $("#clear_canvas").show().fadeIn("slow");
        $("#clear_canvas").click(function(){
            $("#confirm_canvas").hide().fadeOut(1000, "linear");
            $("#clear_canvas").hide().fadeOut(1000, "linear");
        })
    }

    mouseDown() {
        this.startSignature = true;
        this.context.moveTo(event.offsetX, event.offsetY);
        this.context.beginPath();
        // console.log("Starting signature !")
        // $("#canvas_text").text("MouseDown position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);
    }

    touchStart() {
        this.startSignature = true;
        this.context.moveTo(event.touches[0].offsetX, event.touches[0].offsetY);
        this.context.beginPath();
        $("#canvas_text").text("MouseDown position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);

    }

    mouseMove() {
        if (this.startSignature === true) {
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
            // console.log("During signature !")
        }
        // $("#canvas_text_2").text("MouseMove position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);
    }

    touchMove() {
        if (this.startSignature === true) {
            this.context.fill(e.touches[0].offsetX, e.touches[0].offsetY);
            // this.context.lineTo(e.touches[0].offsetX, e.touches[0].offsetY);
            this.context.stroke();
            // console.log("During signature !")
        }
    }

    mouseUp() {
        this.startSignature = false;
        // console.log("Stoping signature !");
        // $("#canvas_text_3").text("MouseUp position => X : " + event.clientX + " , " + " Y : " + event.clientY);
        this.signatureValidation();
    }

    touchEnd() {
        this.startSignature = false;
        this.context.close
        this.signatureValidation();

    }

    clearCanvas() {
        console.log("Clear Clear")
        this.context.clearRect(0, 0, this.canvasId.width, this.canvasId.height)
    }
}