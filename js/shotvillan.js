class ShotVillan {
  constructor() {
    this.x = game.villan.x + game.villan.width / 2;
    this.y = game.villan.y + game.villan.height / 2;
    this.width = 20;
    this.height = 20;
    this.damage = 20;
  }
  draw() {
    rect(this.x, this.y, this.width, this.height)
    this.x -= 19
  }
  collision(objectInfo) {
    const bulletX = this.x + this.width / 2;
    const bulletY = this.y + this.height / 2;
    const objectX = objectInfo.x + objectInfo.width / 2;
    const objectY = objectInfo.y + objectInfo.height / 2;

    if (dist(bulletX, bulletY, objectX, objectY) > 40) {
      return false
    } else {
      game.player.health -= this.damage
      return true
    }
  }
}