class ShotVillain {
  constructor() {
    this.x = game.villain.x + game.villain.width / 2;
    this.y = game.villain.y + game.villain.height / 3.5;
    this.width = 30;
    this.height = 30;
    this.damage = 20;
    this.hitRadius = 50;
  }
  draw() {
    image(game.teslaLogo, this.x, this.y, this.width, this.height)
    this.x -= 17
  }
  hitPlayer(player) {
    player.takeDamage(this.damage);
  }
}
