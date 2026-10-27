class Game {
  constructor() {
    this.mode;
    this.gameSpeed = 1;
    this.obstacleFreq = 100;
    this.playerImage;
    this.backgroundImages;
    this.foregroundImage;
    this.backgroundImagesEndgame;
    this.foregroundImageEndgame
    this.villainImg;
    this.shotImg;

    this.coins = [];
    this.coinImage;
    this.winnerCoin;
    this.coinSound;

    this.obstacles = [];
    this.obstacleImage;

    this.firstAidArr = [];
    this.firstAidImage;

    this.teslaArr = [];
    this.teslaImg;
    this.teslaLogo;
    this.bossIntro;

    this.gameoverSound;
    this.gameoverSoundCounter = 0;
    this.jumpSound;
    this.gettingHitSound;
    this.dogImage;
    this.catImage;
    this.shotSound;
    this.blopSound;
    this.eatSound;
    this.villainHurt;
    this.winnersong;


  }
  setup() {
    this.mode = 0
    this.player = new Player();
    this.villain = new Villain();
    this.background = new Background();
    this.foreground = new Foreground();

  }
  preload() {
    // images
    this.coinImage = loadImage('assets/images/lab.png');
    this.playerImage = loadImage('assets/images/steffen.gif');
    this.shotImg = loadImage('assets/images/shot.png');
    this.firstAidImage = loadImage('assets/images/pizza.png');
    this.obstacleImage = loadImage('assets/images/coronavirus.png');
    this.foregroundImage = loadImage('assets/images/background/day/fg1.png');
    this.foregroundImageNight = loadImage('assets/images/background/night/fg1.png');
    this.foregroundImageEndgame = loadImage('assets/images/background/endgame/fg1.png');
    this.dogImage = loadImage('assets/images/background/day/dog.gif');
    this.catImage = loadImage('assets/images/background/night/cat.gif');
    this.winnerCoin = loadImage('assets/images/winnercoin.png')
    this.teslaLogo = loadImage('assets/images/logotesla.png')
    this.teslaImg = loadImage('assets/images/tesla.png')
    this.villainImg = loadImage('assets/images/elon.gif')

    // small sounds needed right away
    this.coinSound = loadSound('assets/sound/coin.wav');
    this.gettingHitSound = loadSound('assets/sound/hit.wav');
    this.jumpSound = loadSound('assets/sound/jump.wav');
    this.blopSound = loadSound('assets/sound/blop.wav');

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
    // background images night
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

    this.backgroundImagesEndgame = [{
        src: loadImage('assets/images/background/endgame/bg5.png'),
        x: 0,
        speed: 0 * this.gameSpeed
      }, {
        src: loadImage('assets/images/background/endgame/bg4.png'),
        x: 0,
        speed: 1 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/endgame/bg3.png'),
        x: 0,
        speed: 0 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/endgame/bg2.png'),
        x: 0,
        speed: 0 * this.gameSpeed
      },
      {
        src: loadImage('assets/images/background/endgame/bg1.png'),
        x: 0,
        speed: 0 * this.gameSpeed
      }
    ]
  }

  // bigger sounds, loaded in the background from setup()
  loadSounds() {
    this.shotSound = loadSound('assets/sound/shot.wav');
    this.gameoverSound = loadSound('assets/sound/gameover.wav');
    this.winnersong = loadSound('assets/sound/winnersong.mp3');
    this.eatSound = loadSound('assets/sound/eat.wav');
    this.villainHurt = loadSound('assets/sound/villainhurt.wav');
    this.bossIntro = loadSound('assets/sound/bossintro.m4a');
  }

  isOver() {
    return this.player.health <= 0 || this.villain.health <= 0;
  }

  // start a new round without reloading the page (and all assets)
  restart() {
    this.setup();
    this.mode = 1;
    this.gameSpeed = 1;
    this.obstacleFreq = 100;
    this.obstacles = [];
    this.coins = [];
    this.firstAidArr = [];
    this.teslaArr = [];
    this.gameoverSoundCounter = 0;
    [...this.backgroundImages, ...this.backgroundImagesNight, ...this.backgroundImagesEndgame].forEach(bgImg => {
      bgImg.x = 0;
    })
    this.winnersong.stop();
    this.bossIntro.stop();
    this.gameoverSound.stop();
    document.querySelector('.gameover').style.display = "none";
    document.querySelector('.won').style.display = "none";
    song.stop();
    song.setVolume(0.6);
    loopSound(song);
    loop();
  }

  pauseMusic() {
    song.pause();
    this.bossIntro.pause();
  }

  resumeMusic() {
    if (this.bossIntro.isPaused()) {
      playSound(this.bossIntro);
    } else if (!song.isPlaying()) {
      song.setVolume(0.6);
      loopSound(song);
    }
  }

  draw() {
    if (this.mode === 0) {
      noLoop()
    }

    if (this.mode === 1) {
      this.background.draw()
      this.drawFirstAid()
      this.drawObstacles();
      this.drawCoin();
      if (this.player.level > 1) {
        this.drawTesla();
      }
      if (this.player.level === 3) {
        this.gameSpeed = 1;
        this.villain.draw();
        this.obstacleFreq = 10000;
        // back to the main song once the boss intro is over
        if (!this.isOver() && !this.bossIntro.isPlaying() && !song.isPlaying()) {
          loopSound(song);
        }
      }
      this.player.draw();
      this.shoot();
      this.villainShoot()
      this.foreground.draw();
      this.player.healthBarDraw();
      this.player.scoreDraw();
      this.levelStatusDraw();
      this.gameover();
      this.winning();
    }
    // pause mode 
    if (this.mode === 2) {
      this.background.draw();
      this.foreground.draw();
      this.player.healthBarDraw();
      this.levelStatusDraw();
      this.player.scoreDraw();
      noLoop();
      textSize(32);
      text('– PAUSE –', 420, 300);
      textSize(16);
      text('Press "Enter" to resume', 417, 335)
    }
  }

  gameover() {
    if (this.player.health <= 0) {
      document.querySelector('.gameover').style.display = "block";
      background('rgba(0, 0, 0, 0.4)')
      this.player.health = 0;
      this.obstacles = [];
      this.coins = [];
      this.firstAidArr = [];
      this.teslaArr = [];
      this.player.bullets = [];
      this.villain.bullets = [];
      this.pauseMusic();
      if (!this.gameoverSound.isPlaying() && this.gameoverSoundCounter === 0) {
        playSound(this.gameoverSound);
        this.gameoverSoundCounter++
      }
      noLoop()
    }
  }

  winning() {
    if (game.villain.health <= 0) {
      document.querySelector('.won').style.display = "block";
      background('rgba(0, 0, 0, 0.4)');
      this.obstacles = [];
      this.firstAidArr = [];
      this.teslaArr = [];
      this.villain.x = 1100;
      if (frameCount % 10 === 0) {
        this.coins.push(this.coin = new Coin);
      }
      game.villain.health = 0;
      game.villain.bullets = [];
      if (!this.winnersong.isPlaying()) {
        playSound(this.winnersong);
      }
      this.pauseMusic();
    }
  }
  shoot() {
    this.player.bullets.forEach(bullet => {
      bullet.draw();
    })
    this.player.bullets = this.player.bullets.filter(bullet => {
      if (bullet.x > width) return false;
      const target = this.obstacles.find(obs => bullet.collision(obs));
      if (target) {
        this.obstacles = this.obstacles.filter(obs => obs !== target);
        return false;
      }
      return true;
    })
  }

  villainShoot() {
    this.villain.bullets.forEach(bullet => {
      bullet.draw();
    })
    this.villain.bullets = this.villain.bullets.filter(bullet => {
      if (bullet.collision(this.player) || bullet.x < 0) {
        return false
      } else {
        return true;
      }
    })
  }

  levelStatusDraw() {
    push();
    fill('black');
    text(`LEVEL ${this.player.level}`, 460, 50);
    pop();
    if (this.background.turns === 30) {
      game.player.level = 2;
      game.gameSpeed = 1.4;
      game.obstacleFreq = 110;
    }
    // turns stays at 60 for the rest of the game, so only switch to level 3 once
    if (this.background.turns === 60 && this.player.level !== 3) {
      song.pause();
      playSound(this.bossIntro);
      this.gameSpeed = 1.2
      this.player.level = 3;
      this.player.moveLeftSpeed = 10;
      this.player.moveRightSpeed = 10;
    }
  }

  drawObstacles() {
    if (frameCount % this.obstacleFreq === 0) {
      this.obstacles.push(this.obstacle = new Obstacles());
    }
    this.obstacles.forEach(obs => {
      obs.draw();
    })
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.collision(this.player) || obstacle.x < 0) {
        return false
      } else {
        return true
      }
    })
  }

  drawFirstAid() {
    if (frameCount % 834 === 0) {
      this.firstAidArr.push(this.firstAid = new FirstAid());
    }
    this.firstAidArr.forEach(firstAid => {
      firstAid.draw();
    })
    this.firstAidArr = this.firstAidArr.filter(firstAid => {
      if (firstAid.collision(this.player) || firstAid.x < 0) {
        return false
      } else {
        return true
      }
    })
  }

  drawCoin() {
    if (frameCount % 181 === 0) {
      this.coins.push(this.coin = new Coin());
    }
    this.coins.forEach(coin => {
      coin.draw();
    })
    this.coins = this.coins.filter(coin => {
      if (coin.collision(this.player) || coin.x < 0) {
        return false
      } else {
        return true
      }
    })
  }
  drawTesla() {
    if (frameCount % 247 === 0) {
      this.teslaArr.push(this.tesla = new Tesla());
    }
    this.teslaArr.forEach(tesla => {
      tesla.draw()
    })
    this.teslaArr = this.teslaArr.filter(tesla => {
      if (tesla.collision(this.player) || tesla.x < -tesla.width) {
        return false
      } else {
        return true
      }
    })
  }
}