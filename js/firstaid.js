class firstAid {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150
    this.width = 40;
    this.height = 40;
    this.image;
  }
  draw() {
    image(game.firstAidImage, this.x, this.y, this.width, this.height)
    this.x -= 10
  }
  collision(playerInfo) {
    const pizzaX = this.x + this.width / 2;
    const pizzaY = this.y + this.height / 2;
    const playerX = playerInfo.x + playerInfo.width / 2;
    const playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(pizzaX, pizzaY, playerX, playerY) > 100) {
      return false
    } else {
      if (game.player.health < 150) {
        game.player.health += 10;
      }
      return true
    }
  }
}