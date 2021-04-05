class Obstacles {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150;
    this.width = 50;
    this.height = 10;
    this.image;
  }
  collision(playerInfo) {
    const obstacleX = this.x + this.width / 2;
    const obstacleY = this.y + this.height / 2;
    const playerX = playerInfo.x + playerInfo.width / 2;
    const playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(obstacleX, obstacleY, playerX, playerY) > 100) {
      return false
    } else {
      game.player.health -= 20
      console.log('asd')
      return true
    }
  }
  draw() {
    rect(this.x, this.y, this.width, this.height)
    this.x -= 15;
  }
}