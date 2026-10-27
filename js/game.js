class Game {
  constructor() {
    this.mode;
    this.gameSpeed = 1;
    this.levelNumber = 1;
    this.level = LEVELS[0];
    this.levelArt = [];
    this.playerImage;
    this.villainImg;
    this.shotImg;

    this.coins = [];
    this.coinImage;
    this.winnerCoin;
    this.coinSound;

    this.obstacles = [];
    this.obstacleImage;

    this.firstAids = [];
    this.firstAidImage;

    this.teslas = [];
    this.teslaImg;
    this.teslaLogo;
    this.bossIntro;

    this.gameoverSound;
    this.gameoverSoundCounter = 0;
    this.jumpSound;
    this.gettingHitSound;
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
    this.setLevel(1);
  }
  preload() {
    // images
    this.coinImage = loadImage('assets/images/lab.png');
    this.playerImage = loadImage('assets/images/steffen.gif');
    this.shotImg = loadImage('assets/images/shot.png');
    this.firstAidImage = loadImage('assets/images/pizza.png');
    this.obstacleImage = loadImage('assets/images/coronavirus.png');
    this.winnerCoin = loadImage('assets/images/winnercoin.png')
    this.teslaLogo = loadImage('assets/images/logotesla.png')
    this.teslaImg = loadImage('assets/images/tesla.png')
    this.villainImg = loadImage('assets/images/elon.gif')

    // small sounds needed right away
    this.coinSound = loadSound('assets/sound/coin.wav');
    this.gettingHitSound = loadSound('assets/sound/hit.wav');
    this.jumpSound = loadSound('assets/sound/jump.wav');
    this.blopSound = loadSound('assets/sound/blop.wav');

    // background, foreground and animal for each level
    const images = {};
    const load = path => images[path] = images[path] || loadImage(path);
    this.levelArt = LEVELS.map(level => {
      const folder = `assets/images/background/${level.folder}`;
      return {
        layers: level.layers.map(layer => ({ img: load(`${folder}/${layer.file}`), speed: layer.speed })),
        foreground: load(`${folder}/fg1.png`),
        animal: load(level.animal)
      };
    })
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

  setLevel(number) {
    this.levelNumber = number;
    this.level = LEVELS[number - 1];
    this.gameSpeed = this.level.gameSpeed;
    this.player.moveLeftSpeed = this.level.playerSpeed.left;
    this.player.moveRightSpeed = this.level.playerSpeed.right;
    this.background.setLevel(this.levelArt[number - 1]);
    this.foreground.setLevel(this.levelArt[number - 1], this.level.foregroundScrolls);
    if (this.level.boss) {
      song.pause();
      playSound(this.bossIntro);
    }
  }

  isOver() {
    return this.player.health <= 0 || this.villain.health <= 0;
  }

  // start a new round without reloading the page (and all assets)
  restart() {
    this.setup();
    this.mode = 1;
    this.obstacles = [];
    this.coins = [];
    this.firstAids = [];
    this.teslas = [];
    this.gameoverSoundCounter = 0;
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
      const spawn = this.level.spawn;
      this.background.draw()
      this.spawnEvery(spawn.firstAid, this.firstAids, FirstAid);
      this.firstAids = this.updateEntities(this.firstAids);
      this.spawnEvery(spawn.obstacle, this.obstacles, Obstacle);
      this.obstacles = this.updateEntities(this.obstacles);
      this.spawnEvery(spawn.coin, this.coins, Coin);
      this.coins = this.updateEntities(this.coins);
      this.spawnEvery(spawn.tesla, this.teslas, Tesla);
      this.teslas = this.updateEntities(this.teslas);
      if (this.level.boss) {
        this.villain.draw();
        // back to the main song once the boss intro is over
        if (!this.isOver() && !this.bossIntro.isPlaying() && !song.isPlaying()) {
          loopSound(song);
        }
      }
      this.player.draw();
      this.shoot();
      this.villain.bullets = this.updateEntities(this.villain.bullets);
      this.foreground.draw();
      this.player.healthBarDraw();
      this.player.scoreDraw();
      this.levelStatusDraw();
      this.checkLevelUp();
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

  spawnEvery(frames, list, EntityClass) {
    if (frames && frameCount % frames === 0) {
      list.push(new EntityClass());
    }
  }

  // move and draw everything in the list, then drop what hit the player or left the screen
  updateEntities(list) {
    list.forEach(entity => {
      entity.draw();
    })
    return list.filter(entity => {
      if (entity.hitRadius && centersWithin(entity, this.player, entity.hitRadius)) {
        entity.hitPlayer(this.player);
        return false
      }
      return entity.x > -entity.width
    })
  }

  gameover() {
    if (this.player.health <= 0) {
      document.querySelector('.gameover').style.display = "block";
      background('rgba(0, 0, 0, 0.4)')
      this.obstacles = [];
      this.coins = [];
      this.firstAids = [];
      this.teslas = [];
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
      this.firstAids = [];
      this.teslas = [];
      this.villain.x = 1100;
      if (frameCount % 10 === 0) {
        this.coins.push(new WinnerCoin());
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
      const target = this.obstacles.find(obs => centersWithin(bullet, obs, bullet.hitRadius));
      if (target) {
        game.blopSound.setVolume(0.4);
        game.blopSound.play();
        this.obstacles = this.obstacles.filter(obs => obs !== target);
        return false;
      }
      return true;
    })
  }

  levelStatusDraw() {
    push();
    fill('black');
    text(`LEVEL ${this.levelNumber}`, 460, 50);
    pop();
  }

  checkLevelUp() {
    if (this.level.turns && this.background.turns >= this.level.turns) {
      this.setLevel(this.levelNumber + 1);
    }
  }
}
