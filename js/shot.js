class Shot {
  constructor() {
    this.x = game.player.x + game.player.width / 2;
    this.y = game.player.y + game.player.height / 3;
    this.width = 30;
    this.height = 30;
    this.damage = 20;
    this.hitRadius = 40;
  }
  update() {
    this.x += 19;
  }
  draw() {
    image(game.images.shot, this.x, this.y, this.width, this.height);
  }
}
