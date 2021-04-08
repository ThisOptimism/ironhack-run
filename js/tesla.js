class Tesla {
  constructor() {
    this.x = width;
    this.y = 470;
    this.height = 100;
    this.width = 333;
  }
  draw() {
    image(game.teslaImg, this.x, this.y, this.width, this.height)
    this.x -= 13 * game.gameSpeed;
  }
  collision(playerInfo) {
    const teslaX = this.x + this.width / 2;
    const teslaY = this.y + this.height / 2;
    const playerX = playerInfo.x + playerInfo.width / 2;
    const playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(teslaX, teslaY, playerX, playerY) > 150) {
      return false
    } else {
      game.player.health -= 20;
      game.gettingHitSound.play();
      return true
    }
  }
}