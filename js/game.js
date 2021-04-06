class Game {
  constructor() {
    this.mode;
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
    this.obstacleFreq = 1;
    this.jumpSound;
    this.dogImage;
  }
  setup() {
    this.mode = 0
    this.player = new Player();
    this.background = new Background();
    this.foreground = new Foreground();

  }
  preload() {
    // neuro = loadFont('assets/fonts/neuropol.ttf');
    this.coinImage = loadImage('assets/images/lab.png');
    this.playerImage = loadImage('assets/images/steffen.gif');
    this.firstAidImage = loadImage('assets/images/pizza.png');
    this.obstacleImage = loadImage('assets/images/coronavirus.png');
    this.foregroundImage = loadImage('assets/images/background/day/fg1.png');
    this.foregroundImageNight = loadImage('assets/images/background/night/fg1.png');
    this.dogImage = loadImage('assets/images/background/day/dog.gif')

    // sounds
    this.jumpSound = loadSound('assets/sound/jump.wav')

    // background images
    this.backgroundImages = [{
        src: loadImage('assets/images/background/day/bg4.png'),
        x: 0,
        speed: 1 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/day/bg3.png'),
        x: 0,
        speed: 1.5 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/day/bg2.png'),
        x: 0,
        speed: 2 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/day/bg1.png'),
        x: 0,
        speed: 6 * this.gameSpeed
      }
    ]
    // bachground Images Day
    this.backgroundImagesNight = [{
        src: loadImage('assets/images/background/night/bg4.png'),
        x: 0,
        speed: 1 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/night/bg3.png'),
        x: 0,
        speed: 1.5 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/night/bg2.png'),
        x: 0,
        speed: 2 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/night/bg1.png'),
        x: 0,
        speed: 6 * this.gameSpeed
      }
    ]
  }

  draw() {
    // game mode
    if (this.mode === 1) {
      this.background.draw()
      this.drawFirstAid()
      game.drawObstacles();
      this.coinDraw();
      this.player.draw();
      this.foreground.draw();
      this.player.healthBarDraw();
      this.player.scoreDraw();
      this.levelStatusDraw();
      this.gameover();
      frameRate(60)
    }
    // pause mode 
    if (this.mode === 2) {
      this.background.draw();
      this.foreground.draw();
      this.player.healthBarDraw();
      this.levelStatusDraw();
      this.player.scoreDraw();
      frameRate(0);
      textSize(32);
      text('– PAUSE –', 420, 300);
      textSize(16);
      text('Press "Enter" to resume', 417, 335)
    }
  }

  gameover() {
    // Game Over LOGIC here...
    if (this.player.health <= 0) {
      document.querySelector('.gameover').style.display = "block";
      background('rgba(0, 0, 0, 0.4)')
      frameRate(0)
      this.obstacles = [];
      this.coins = [];
      this.firstAidArr = [];
      song.pause();
    }
  }

  levelStatusDraw() {
    push();
    fill('black');
    text(`LEVEL ${this.player.level}`, 460, 50);
    pop();
  }


  drawObstacles() {
    if (frameCount * this.obstacleFreq % 100 === 0) {
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