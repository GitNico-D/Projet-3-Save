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
        $("#signature_canvas").mouseleave(this.mouseLeave.bind(this));
        $("#clear_canvas").click(this.clearCanvas.bind(this));
        // this.testingDraw()
    }
    
    // testingDraw() {
    //     this.context.beginPath();
    //     this.context.moveTo(0,75);
    //     this.context.lineTo(250,75);
    //     this.context.stroke()
    // }

    // showCanvas() {
    //     console.log("Affichage Canvas " )
    //     $("#signature_canvas").css("display", "block")
    // }

    signatureValidation() {
        console.log("Show Confirmation or Cancelation");
        $("#confirm_canvas").show().fadeIn(1000, "linear");
        $("#clear_canvas").show().fadeIn("slow");
        $("#clear_canvas").click(function(){
            $("#confirm_canvas").hide().fadeOut(1000, "linear");
        })
    }

    mouseDown() {
        this.startSignature = true;
        this.context.moveTo(event.offsetX, event.offsetY)
        this.context.beginPath()
        console.log("Starting signature !")
        $("#canvas_text").text("MouseDown position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);
    }

    mouseMove() {
        if (this.startSignature === true) {
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
            console.log("During signature !")
        }
        $("#canvas_text_2").text("MouseMove position => X : " + event.offsetX + " , " + " Y : " + event.offsetY);
    }

    mouseUp() {
        this.startSignature = false;
        this.signatureValidation();
        console.log("Stoping signature !");
        this.context.removeHitRegion()
        $("#canvas_text_3").text("MouseUp position => X : " + event.clientX + " , " + " Y : " + event.clientY);
    }

    mouseLeave() {
        this.startSignature = false;
        this.signatureValidation();
    }

    clearCanvas() {
        console.log("Clear Clear")
        this.context.clearRect(0, 0, this.canvasId.width, this.canvasId.height)
    }
}