class Game {
  constructor() {
    this.playerImage;
    this.firstAidImage;
    this.obstacleImage;
    this.backgroundImages;
    this.foregroundImage;
    this.coinImage;
    this.coins = [];
    this.obstacles = [];
    this.firstAidArr = [];
  }

  setup() {
    this.player = new Player();
    this.background = new Background();
    this.foreground = new Foreground();
  }
  preload() {
    // neuro = loadFont('assets/fonts/neuropol.ttf');
    this.coinImage = loadImage('assets/images/coin.png');
    this.playerImage = loadImage('assets/images/steffen.gif');
    this.firstAidImage = loadImage('assets/images/pizza.png');
    this.obstacleImage = loadImage('assets/images/coronavirus.png');
    this.foregroundImage = loadImage('assets/images/background/fg1.png');


    // background images
    this.backgroundImages = [{
      src: loadImage('assets/images/background/bg3.png'),
      x: 0,
      speed: 1
    }, {
      src: loadImage('assets/images/background/bg2.png'),
      x: 0,
      speed: 3
    }, {
      src: loadImage('assets/images/background/bg1.png'),
      x: 0,
      speed: 5
    }]
  }

  draw() {
    this.background.draw()
    this.drawFirstAid()
    game.drawObstacles();
    this.coinDraw();
    this.player.draw();
    this.foreground.draw();
    this.player.healthBarDraw();
    this.player.scoreDraw();
    this.levelStatusDraw();

  }

  levelStatusDraw() {
    push();
    fill('black');
    text(`LEVEL ${this.player.level}`, 460, 50);
    pop();
  }


  drawObstacles() {
    if (frameCount % 200 === 0) {
      this.obstacles.push(this.obstacle = new Obstacles());
    }
    this.obstacles = this.obstacles.filter(obstacle => {
      if (this.obstacle.collision(this.player) || this.obstacle.x < 0) {
        return false
      } else {
        return true
      }
    })
    this.obstacles.forEach(obs => {
      obs.draw();
    })
  }

  drawFirstAid() {
    if (frameCount % 10000 === 0) {
      this.firstAidArr.push(this.firstAid = new firstAid());
    }
    this.firstAidArr = this.firstAidArr.filter(firstAid => {
      if (this.firstAid.collision(this.player) || this.firstAid.x < 0) {
        return false
      } else {
        return true
      }
    })
    this.firstAidArr.forEach(firstAid => {
      firstAid.draw();
    })
  }

  coinDraw() {
    if (frameCount % 80 === 0) {
      this.coins.push(this.coin = new Coin);
    }
    this.coins = this.coins.filter(coin => {
      if (this.coin.collision(this.player)) {
        return false
      } else {
        return true
      }
    })
    this.coins.forEach(coin => {
      coin.draw();
    })
  }
}