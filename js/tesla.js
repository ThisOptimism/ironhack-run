class Tesla {
  constructor() {
    this.x = width;
    this.y = 470;
    this.height = 100;
    this.width = 333;
    this.hitRadius = 150;
  }
  draw() {
    image(game.teslaImg, this.x, this.y, this.width, this.height)
    this.x -= 13 * game.gameSpeed;
  }
  hitPlayer(player) {
    player.takeDamage(20);
    game.gettingHitSound.play();
  }
}
