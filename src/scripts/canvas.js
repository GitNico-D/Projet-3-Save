class Canvas {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.context = this.canvasId.getContext("2d");
        this.context.lineWidth = "2";
        this.context.lineJoin = "round";
        this.context.strokeStyle = "black";
        this.startSignature = false;
        this.rect = this.canvasId.getBoundingClientRect();
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
        $("#confirm_canvas").toggleClass("hide", false);
        $("#clear_canvas").toggleClass("hide", false);
        $("#clear_canvas").click(function(){
            $("#confirm_canvas").toggleClass("hide", true);
            $("#clear_canvas").toggleClass("hide", true);
        })
    }

    mouseDown() {
        this.startSignature = true;
        this.context.moveTo(event.offsetX, event.offsetY);
        this.context.beginPath();
        // console.log("Starting signature !")
        console.log("MouseDown position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);
    }

    touchStart() {
        // let rect = canvasId.getBoundingoffsetRect();
        this.startSignature = true;
        this.context.moveTo(event.touches[0].clientX, event.touches[0].clientY);
        this.context.moveTo((event.touches[0].clientX - this.canvasId.width), (event.touches[0].clientY - this.canvasId.height));
        this.context.beginPath();
        console.log(outer.width, this.canvasId.height)
        console.log("TouchStart position => X : " + event.touches[0].offsetX  + " , " + " Y : " + event.touches[0].offsetY);
        console.log("TouchStart position => X : " + (event.touches[0].clientX - this.canvasId.height)  + " , " + " Y : " + (event.touches[0].clientY - this.canvasId.height));

    }

    mouseMove() {
        if (this.startSignature === true) {
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
            // console.log("During signature !")
        }
        // $("#canvas_text_2").text("MouseMove position => X : " + event.clientX + " , " + " Y : " + event.clientY);
    }

    touchMove() {
        if (this.startSignature === true) {
            // this.context.fill(event.touches[0].clientX, event.touches[0].clientY);
            this.context.lineTo(event.touches[0].clientX, event.touches[0].clientY);
            this.context.stroke();
            console.log("Signature en cours !")
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
        this.context.closedPath();
        this.signatureValidation();

    }

    clearCanvas() {
        console.log("Clear Clear")
        this.context.clearRect(0, 0, this.canvasId.width, this.canvasId.height);
        $("#confirm_canvas").toggleClass("hide", true);
        $("#clear_canvas").toggleClass("hide", true);
    }
}