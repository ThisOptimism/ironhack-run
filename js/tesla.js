class Tesla {
  constructor() {
    this.x = width;
    this.y = 470;
    this.height = 100;
    this.width = 333;
    this.hitRadius = 150;
  }
  update() {
    this.x -= 13 * game.gameSpeed;
  }
  draw() {
    image(game.images.tesla, this.x, this.y, this.width, this.height);
  }
  hitPlayer(player) {
    player.takeDamage(20);
    game.sounds.hit.play();
  }
}
