class Slide {
    constructor (slideId, color, position) {
        this.slideId = slideId;
        this.color = color;
        this.position = position;
        $("#next_slide").click(this.sliderChange.bind(this, 1));
        $("#previous_slide").click(this.sliderChange.bind(this, -1));
        this.start = false;
        // this.sliderAutoChange();
        $("#play_pause_slider").click(this.sliderAutoChange.bind(this));
        $(document).keydown(this.sliderKeyboardChange.bind(this));
    }

    sliderAutoChange() {
        if (!this.start) {
            $("#play_pause_slider").removeClass("fa-play-circle");         
            this.interval = setInterval(this.sliderChange.bind(this, 1), 5000)
            $("#play_pause_slider").addClass("fa-pause-circle");
            console.log("Start Slider !");
        } else {
            $("#play_pause_slider").removeClass("fa-pause-circle");
            clearInterval(this.interval); 
            $("#play_pause_slider").addClass("fa-play-circle");
            console.log("Pause Slider !")             
        }
        this.start=!this.start;
    }
    
    sliderChange(direction) {
        let $allSlides = $(".slide_img"); 
        let $currentSlide = $(".active_slide");
        let $slidePosition = $(".slide_img").index($currentSlide);
        $($allSlides[$slidePosition]).removeClass("active_slide")
        $slidePosition += direction;
        $($allSlides[$slidePosition]).addClass("active_slide") 
        if ($slidePosition >= $allSlides.length) {
            console.log("Reset slider plus !")
            $($allSlides[$slidePosition]).removeClass("active_slide")  
            $slidePosition = 0;
            $($allSlides[$slidePosition]).addClass("active_slide")
        } else if ($slidePosition < 0) {
            console.log("Reset Slide moins !")
            $($allSlides[$slidePosition]).removeClass("active_slide")
            $slidePosition = $allSlides.length - 1;
            $($allSlides[$slidePosition]).addClass("active_slide")
        }                
    }

    sliderKeyboardChange() {
        if (event.keyCode === 39) {
            console.log(event.keyCode + " => Right Slider Change !");
            this.sliderChange(1);
        } if (event.keyCode === 37) {
            console.log(event.keyCode + " => Left Slider Change !");
            this.sliderChange(-1);
        } if (event.keyCode === 32) {
            console.log(event.keyCode + " => Play/Pause Slider !");
            this.sliderChange();
        }     
        event.preventDefault();
    }
}