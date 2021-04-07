class Shot {
  constructor() {
    this.x = game.player.x + game.player.width / 2;
    this.y = game.player.y + game.player.height / 3;
    this.width = 20;
    this.height = 20;
    this.damage = 20;
  }
  draw() {
    rect(this.x, this.y, this.width, this.height)
    this.x += 19
  }
  collision(objectInfo) {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    const objectX = objectInfo.x + objectInfo.width / 2;
    const objectY = objectInfo.y + objectInfo.height / 2;

    if (dist(bulletX, bulletY, objectX, objectY) > 50) {
      return false
    } else {
      console.log('asd')
      game.obstacles.splice(game.obstacles.indexOf(objectInfo));
      return true
    }
  }
}