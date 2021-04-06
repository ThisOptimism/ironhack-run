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
    if (this.turns >= 30) {
      game.backgroundImagesNight.forEach(bgImg => {
        bgImg.x -= bgImg.speed
        image(bgImg.src, bgImg.x, 0, width, height)
        image(bgImg.src, bgImg.x + width, 0, width, height)
        if (bgImg.x <= -width) {
          bgImg.x = 0;
          game.player.level = 2;
          game.gameSpeed = 1.5;
          this.turns++
        }
      })

    }
  }
}