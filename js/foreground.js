class Foreground {
  constructor() {
    this.x = 0;
  }
  draw() {
    // Level 1
    if (game.player.score >= 0) {
      image(game.foregroundImage, this.x, 0, width, height)
      image(game.foregroundImage, this.x + width, 0, width, height)
      this.x -= 6;
      if (this.x <= -width) {
        this.x = 0
      }
    }
    // transition
    // Level 2
  }
}