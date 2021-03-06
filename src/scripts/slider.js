class Slider {
  constructor() {
    $("#next_slide").click(this.sliderChange.bind(this, 1));
    $("#previous_slide").click(this.sliderChange.bind(this, -1));
    this.start = false;
    this.sliderAutoChange();
    $("#play_pause_slider").click(this.sliderAutoChange.bind(this));
    $(document).keydown(this.sliderKeyboardChange.bind(this));
  }

  sliderAutoChange() {
    if (!this.start) {
      $("#changed_icon").removeClass("fa-play-circle");
      this.interval = setInterval(this.sliderChange.bind(this, 1), 5000);
      $("#changed_icon").addClass("fa-pause-circle");
    } else {
      $("#changed_icon").removeClass("fa-pause-circle");
      clearInterval(this.interval);
      $("#changed_icon").addClass("fa-play-circle");
    }
    this.start = !this.start;
  }

  sliderChange(direction) {
    let $allSlides = $(".slider-slide");
    let $currentSlide = $(".slider-active_slide");
    let $slidePosition = $(".slider-slide").index($currentSlide);
    $($allSlides[$slidePosition]).removeClass("slider-active_slide");
    $slidePosition += direction;
    $($allSlides[$slidePosition]).addClass("slider-active_slide");
    if ($slidePosition >= $allSlides.length) {
      $($allSlides[$slidePosition]).removeClass("slider-active_slide");
      $slidePosition = 0;
      $($allSlides[$slidePosition]).addClass("slider-active_slide");
    } else if ($slidePosition < 0) {
      $($allSlides[$slidePosition]).removeClass("slider-active_slide");
      $slidePosition = $allSlides.length - 1;
      $($allSlides[$slidePosition]).addClass("slider-active_slide");
    }
  }

  sliderKeyboardChange() {
    if (event.keyCode === 39) {
      event.preventDefault();
      this.sliderChange(1);
    }
    if (event.keyCode === 37) {
      event.preventDefault();
      this.sliderChange(-1);
    }
    if (event.keyCode === 32) {
      event.preventDefault();
      this.sliderAutoChange();
    }
  }
}
