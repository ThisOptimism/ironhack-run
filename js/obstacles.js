class Obstacle {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150
    this.width = 50;
    this.height = 50;
    this.hitRadius = 90;
  }
  hitPlayer(player) {
    game.gettingHitSound.setVolume(1)
    game.gettingHitSound.play();
    player.takeDamage(20);
  }
  draw() {
    image(game.obstacleImage, this.x, this.y, this.width, this.height);
    this.x -= 11 * game.gameSpeed;
  }
}
