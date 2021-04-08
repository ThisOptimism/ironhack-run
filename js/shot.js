class Shot {
  constructor() {
    this.x = game.player.x + game.player.width / 2;
    this.y = game.player.y + game.player.height / 3;
    this.width = 30;
    this.height = 30;
    this.damage = 20;
  }
  draw() {
    image(game.shotImg, this.x, this.y, this.width, this.height)
    // rect(this.x, this.y, this.width, this.height)
    this.x += 19
  }
  collision(objectInfo) {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    const objectX = objectInfo.x + objectInfo.width / 2;
    const objectY = objectInfo.y + objectInfo.height / 2;

    if (dist(bulletX, bulletY, objectX, objectY) > 40) {
      return false
    } else {
      game.blopSound.setVolume(0.4);
      game.blopSound.play();
      game.obstacles.splice(game.obstacles.indexOf(objectInfo));
      return true
    }
  }
}