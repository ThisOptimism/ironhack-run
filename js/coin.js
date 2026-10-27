class Coin {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150;
    this.width = 36;
    this.height = 27;
    this.hitRadius = 80;
  }
  update() {
    this.x -= 5 * game.gameSpeed;
  }
  draw() {
    image(game.images.coin, this.x, this.y, this.width, this.height);
  }
  hitPlayer(player) {
    player.score += 5;
    game.sounds.coin.play();
    game.sounds.coin.setVolume(0.2);
  }
}

// coins raining down after the win, just decoration so they can't be collected
class WinnerCoin {
  constructor() {
    this.x = width;
    this.y = (Math.random() * height) / 2 + 150;
    this.width = 36;
    this.height = 27;
  }
  update() {
    this.x -= 10 * game.gameSpeed;
  }
  draw() {
    image(game.images.winnerCoin, this.x, this.y, this.width, this.height);
  }
}
