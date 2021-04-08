class Foreground {
  constructor() {
    this.x = 0;
    this.x2 = 0;
    this.turns = 0;
  }
  draw() {
    // Level 1
    if (game.background.turns < 30) {
      image(game.dogImage, this.x2 + 400, 0, width, height);
      image(game.foregroundImage, this.x, 0, width, height);
      image(game.foregroundImage, this.x + width, 0, width, height);
      this.x2 -= 7;
      if (this.x2 <= -width - 2000) {
        this.x2 = 0
      }
      this.x -= 6;
      if (this.x <= -width) {
        this.x = 0
        this.turns++
      }
    }
    // transition
    // Level 2
    if (game.background.turns >= 30 && game.background.turns < 60) {
      image(game.foregroundImageNight, this.x, 0, width, height)
      image(game.foregroundImageNight, this.x + width, 0, width, height)
      this.x -= 6;
      if (this.x <= -width) {
        this.x = 0
      }
    }

    // final Level
    if (game.background.turns >= 60) {
      image(game.dogImage, this.x2 + 400, 0, width, height);
      image(game.foregroundImage, this.x, 0, width, height);
      image(game.foregroundImage, this.x + width, 0, width, height);
      this.x2 = 0;
    }
  }
}