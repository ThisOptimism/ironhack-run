class Obstacle {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150;
    this.width = 50;
    this.height = 50;
    this.hitRadius = 90;
  }
  hitPlayer(player) {
    game.sounds.hit.setVolume(1);
    game.sounds.hit.play();
    player.takeDamage(20);
  }
  update() {
    this.x -= 11 * game.gameSpeed;
  }
  draw() {
    image(game.images.obstacle, this.x, this.y, this.width, this.height);
  }
}
