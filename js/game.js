class Game {
  constructor() {
    this.playerImage;
    this.firstAidImage;
    this.obstacleImage;
    this.backgroundImages;
    this.foregroundImage;
    this.coinImage;
    this.mySound;
    this.coins = [];
    this.obstacles = [];
    this.firstAidArr = [];
    this.gameSpeed = 1;
    this.song;
   
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
        speed: 1 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/bg2.png'),
        x: 0,
        speed: 3 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/bg1.png'),
        x: 0,
        speed: 5 * this.gameSpeed
      }
    ]
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
    if (frameCount * this.gameSpeed % 100 === 0) {
      this.obstacles.push(this.obstacle = new Obstacles(1));
    }
    this.obstacles.forEach(obs => {
      obs.draw();
    })
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.collision(this.player) || this.obstacle.x < 0) {
        return false
      } else {
        return true
      }
    })
  }

  drawFirstAid() {
    if (frameCount % 1000 === 0) {
      this.firstAidArr.push(this.firstAid = new firstAid());
    }
    this.firstAidArr.forEach(firstAid => {
      firstAid.draw();
    })
    this.firstAidArr = this.firstAidArr.filter(firstAid => {
      if (firstAid.collision(this.player) || this.firstAid.x < 0) {
        return false
      } else {
        return true
      }
    })
  }

  coinDraw() {
    if (frameCount % 30 === 0) {
      this.coins.push(this.coin = new Coin());
    }
    this.coins.forEach(coin => {
      coin.draw();
    })
    this.coins = this.coins.filter(coin => {
      if (coin.collision(this.player)) {
        return false
      } else {
        return true
      }
    })
  }
}