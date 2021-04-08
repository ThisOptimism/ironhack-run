class ShotVillan {
  constructor() {
    this.x = game.villan.x + game.villan.width / 2;
    this.y = game.villan.y + game.villan.height / 3.5;
    this.width = 30;
    this.height = 30;
    this.damage = 20;
  }
  draw() {
    image(game.teslaLogo, this.x, this.y, this.width, this.height)
    this.x -= 17
  }
  collision(objectInfo) {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    const objectX = objectInfo.x + objectInfo.width / 2;
    const objectY = objectInfo.y + objectInfo.height / 2;

    if (dist(bulletX, bulletY, objectX, objectY) > 50) {
      return false
    } else {
      game.player.health -= this.damage
      return true
    }
  }
}