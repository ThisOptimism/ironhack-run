class Background {
  draw() {
    // Level #1
    if (game.player.score >= 0) {
      game.backgroundImages.forEach(bgImg => {
        bgImg.x -= bgImg.speed
        image(bgImg.src, bgImg.x, 0, width, height)
        image(bgImg.src, bgImg.x + width, 0, width, height)
        if (bgImg.x <= -width) {
          bgImg.x = 0;
        }
      })
    }
    // TransitionEvent
    // Level #2
  }
}