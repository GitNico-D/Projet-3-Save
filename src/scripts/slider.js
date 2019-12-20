class Slide {
    constructor (slideId, color, position) {
        this.slideId = slideId;
        this.color = color;
        this.position = position;
        console.log(this);
        // this.createSlide(); 
        $("#next_slide").click(this.sliderChange.bind(this, 1));
        $("#previous_slide").click(this.sliderChange.bind(this, -1));
        // $("#next_slide").click(this.slideRightChange.bind(this));
        this.start = false;
        // this.sliderAutoChange();
        $("#play_pause_slider").click(this.sliderAutoChange.bind(this));
        // $("#previous_slide").click(this.slideLeftChange.bind(this));
        $(document).keydown(this.sliderKeyboardChange.bind(this));
    }
    
    // createSlide() {
    //     let slide = `<div id="${this.name}" class="slide_img ${this.color}">
    //                     <span class="text_content_slide">SLIDE ${this.position}</span>
    //                     <div class="background_arrow_right"></div>
    //                     <div class="background_arrow_left"></div>
    //                 </div>`
    //     $("#slider").append(slide);
    //     if (this.position === 1) {
    //         $(`#${this.name}`).addClass("active_slide");
    //     }
    // }

    sliderAutoChange() {
        if (!this.start) {
            $("#play_pause_slider").removeClass("fa-play-circle");         
            this.interval = setInterval(this.slideRightChange.bind(this), 5000)
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

    // Optimiser slideRightChange et slideLeftChange en 1 méthode unique !
    
    sliderChange(direction) {
        let $allSlides = $(".slide_img"); 
        let $currentSlide = $(".active_slide");
        let $slidePosition = $(".slide_img").index($currentSlide);
        if ($slidePosition === $allSlides.length - 1) {
            console.log("Reset slider plus !")
            console.log($slidePosition)
            $($allSlides[$slidePosition]).removeClass("active_slide")
            console.log($($allSlides[$slidePosition]))
            $slidePosition = 0;
            $($allSlides[$slidePosition]).addClass("active_slide")
            console.log($($allSlides[$slidePosition]))
            console.log($slidePosition)
        } 
        // if ($slidePosition < 0) {
        //     console.log("Reset Slide moins !")
        //     $($allSlides[$slidePosition]).removeClass("active_slide")
        //     $slidePosition = $allSlides.length - 1;
        //     $($allSlides[$slidePosition]).addClass("active_slide")
        // } 
         else {
            $($allSlides[$slidePosition]).removeClass("active_slide")
            $slidePosition += direction;
            $($allSlides[$slidePosition]).addClass("active_slide")
            if (direction === 1) {
            console.log("Next Slide !")
            console.log($slidePosition)
            console.log($allSlides.length -1)
            } else {
                console.log("Previous Slide !")
            }
        }
    }

    slideRightChange() {
        let $allSlides = $(".slide_img") 
        let $currentSlide = $(".active_slide");
        let $slidePosition = $(".slide_img").index($currentSlide)
            if ($slidePosition === $allSlides.length - 1) {
                $($allSlides[$slidePosition]).removeClass("active_slide")
                $slidePosition = 0;
                $($allSlides[$slidePosition]).addClass("active_slide")
            } else {
                $($allSlides[$slidePosition]).removeClass("active_slide")
                $slidePosition ++;
                $($allSlides[$slidePosition]).addClass("active_slide")
            }
            console.log("Dernière valeur $slidePosition = " + $slidePosition);
    }

    slideLeftChange() {
        let $allSlides = $(".slide_img") // A mettre dans conctrustor ??
        let $currentSlide = $(".active_slide");
        let $slidePosition = $(".slide_img").index($currentSlide)
            if ($slidePosition === 0) {
                $($allSlides[$slidePosition]).removeClass("active_slide")
                $slidePosition = $allSlides.length - 1;
                $($allSlides[$slidePosition]).addClass("active_slide")
            } else {
                $($allSlides[$slidePosition]).removeClass("active_slide")
                $slidePosition --;
                $($allSlides[$slidePosition]).addClass("active_slide")
            }
            console.log("Dernière valeur $slidePosition = " + $slidePosition);
    }

    sliderKeyboardChange() {
        if (event.keyCode === 39) {
            console.log(event.keyCode + " => Right Slider Change !");
            this.slideRightChange();
        } if (event.keyCode === 37) {
            console.log(event.keyCode + " => Left Slider Change !");
            this.slideLeftChange();
        } if (event.keyCode === 32) {
            console.log(event.keyCode + " => Play/Pause Slider !");
            this.sliderAutoChange();
        }     
    }
}
       

