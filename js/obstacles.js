class Obstacles {
  constructor(freq) {
    this.freq = 1;
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150 * this.freq
    this.width = 50;
    this.height = 50;
    this.img;
  }
  collision(playerInfo) {
    const obstacleX = this.x + this.width / 2;
    const obstacleY = this.y + this.height / 2;
    const playerX = playerInfo.x + playerInfo.width / 2;
    const playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(obstacleX, obstacleY, playerX, playerY) > 90) {
      return false
    } else {
      game.gettingHitSound.setVolume(1)
      game.gettingHitSound.play();
      game.player.health -= 20;
      return true
    }
  }
  draw() {
    image(game.obstacleImage, this.x, this.y, this.width, this.height);
    this.x -= 11 * game.gameSpeed;
  }
}