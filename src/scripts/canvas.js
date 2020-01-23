class Canvas {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.context = this.canvasId.getContext("2d");
        this.context.font = "48px serif"
        this.context.fillStyle = "rgba(92,92,92,0.3)";
        this.context.fillText("Signature", 50, 80);
        this.userSignature();

    }
    
    userSignature() {
        console.log(this.canvasId)
        let target = this.canvasId;
        $("#signature_canvas").mousedown(function(event){
            let positionX = event.clientX
            let positionY = event.clientY
            console.log(positionX, positionY)
        })
    }
}