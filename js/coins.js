class Coin {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150
    this.width = 30;
    this.height = 30;
    this.image;
  }
  draw() {
    image(game.coinImage, this.x, this.y, this.width, this.height)
    this.x -= 5 * game.gameSpeed;
  }

  collision(playerInfo) {
    const coinX = this.x + this.width / 2;
    const coinY = this.y + this.height / 2;
    const playerX = playerInfo.x + playerInfo.width / 2;
    const playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(coinX, coinY, playerX, playerY) > 80) {
      return false
    } else {
      game.player.score++;
      return true
    }
  }
}