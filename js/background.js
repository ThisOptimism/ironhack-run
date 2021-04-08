class Background {
  constructor() {
    this.turns = 0;
  }
  draw() {
    // Level #1
    if (this.turns < 30) {
      game.backgroundImages.forEach(bgImg => {
        bgImg.x -= bgImg.speed
        image(bgImg.src, bgImg.x, 0, width, height)
        image(bgImg.src, bgImg.x + width, 0, width, height)
        if (bgImg.x <= -width) {
          bgImg.x = 0;
          this.turns++
        }
      })
    }


    // TransitionEvent
    // Level #2
    if (this.turns >= 30 && this.turns < 60) {
      game.backgroundImagesNight.forEach(bgImg => {
        bgImg.x -= bgImg.speed
        image(bgImg.src, bgImg.x, 0, width, height)
        image(bgImg.src, bgImg.x + width, 0, width, height)
        if (bgImg.x <= -width) {
          bgImg.x = 0;
          this.turns++
        }
      })
    }

    if (this.turns >= 60) {
      game.backgroundImages.forEach(bgImg => {
        bgImg.x = 0;
        image(bgImg.src, bgImg.x, 0, width, height)
        image(bgImg.src, bgImg.x + width, 0, width, height)
        if (bgImg.x <= -width) {
          bgImg.x = 0;
          this.turns++
        }
      })
    }
  }
}