class FirstAid {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150
    this.width = 40;
    this.height = 40;
    this.hitRadius = 100;
  }
  update() {
    this.x -= 10
  }
  draw() {
    image(game.firstAidImage, this.x, this.y, this.width, this.height)
  }
  hitPlayer(player) {
    if (!game.eatSound.isPlaying()) {
      playSound(game.eatSound);
    }
    player.heal(30);
  }
}
