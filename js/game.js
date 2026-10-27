// load every path in { name: path } with `load`, keeping the names
function loadAll(paths, load) {
  return Object.fromEntries(Object.entries(paths).map(([name, path]) => [name, load(path)]));
}

class Game {
  constructor() {
    this.mode;
    this.gameSpeed = 1;
    this.levelNumber = 1;
    this.level = LEVELS[0];
    this.levelArt = [];
    this.images = {};
    this.sounds = {};
    this.coins = [];
    this.obstacles = [];
    this.firstAids = [];
    this.teslas = [];
  }
  setup() {
    this.mode = MODE.MENU;
    this.roundOver = false;
    this.obstacles = [];
    this.coins = [];
    this.firstAids = [];
    this.teslas = [];
    this.player = new Player();
    this.villain = new Villain();
    this.background = new Background();
    this.foreground = new Foreground();
    this.setLevel(1);
  }
  preload() {
    this.images = loadAll(IMAGES, loadImage);
    this.sounds = loadAll(SOUNDS, loadSound);

    // background, foreground and animal for each level
    const images = {};
    const load = (path) => (images[path] = images[path] || loadImage(path));
    this.levelArt = LEVELS.map((level) => {
      const folder = `assets/images/background/${level.folder}`;
      return {
        layers: level.layers.map((layer) => ({
          img: load(`${folder}/${layer.file}`),
          speed: layer.speed,
        })),
        foreground: load(`${folder}/fg1.png`),
        animal: load(level.animal),
      };
    });
  }

  // bigger sounds, loaded in the background from setup()
  loadSounds() {
    Object.assign(this.sounds, loadAll(BACKGROUND_SOUNDS, loadSound));
    // the menu song starts as soon as it has loaded
    this.sounds.menuMusic = loadSound('assets/sound/song1.m4a', () => {
      if (this.mode === MODE.MENU) this.sounds.menuMusic.loop();
    });
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
      this.sounds.music.pause();
      playSound(this.sounds.bossIntro);
    }
  }

  isOver() {
    return this.player.health <= 0 || this.villain.health <= 0;
  }

  // start a new round without reloading the page (and all assets)
  restart() {
    this.setup();
    this.mode = MODE.PLAYING;
    this.sounds.winnerSong.stop();
    this.sounds.bossIntro.stop();
    this.sounds.gameOver.stop();
    document.querySelector('.gameover').style.display = 'none';
    document.querySelector('.won').style.display = 'none';
    this.sounds.music.stop();
    this.sounds.music.setVolume(0.6);
    loopSound(this.sounds.music);
    loop();
  }

  pauseMusic() {
    this.sounds.music.pause();
    this.sounds.bossIntro.pause();
  }

  resumeMusic() {
    if (this.sounds.bossIntro.isPaused()) {
      playSound(this.sounds.bossIntro);
    } else if (!this.sounds.music.isPlaying()) {
      this.sounds.music.setVolume(0.6);
      loopSound(this.sounds.music);
    }
  }

  draw() {
    if (this.mode === MODE.MENU) {
      noLoop();
      return;
    }
    if (this.mode === MODE.PLAYING) {
      this.update();
    }
    this.render();
    if (this.mode === MODE.PAUSED) {
      noLoop();
      textSize(32);
      text('– PAUSE –', 420, 300);
      textSize(16);
      text('Press "Enter" to resume', 417, 335);
    }
  }

  // move everything, handle hits and decide what happens next
  update() {
    const spawn = this.level.spawn;
    this.background.update();
    this.spawnEvery(spawn.firstAid, this.firstAids, FirstAid);
    this.firstAids = this.updateEntities(this.firstAids);
    this.spawnEvery(spawn.obstacle, this.obstacles, Obstacle);
    this.obstacles = this.updateEntities(this.obstacles);
    this.spawnEvery(spawn.coin, this.coins, Coin);
    this.coins = this.updateEntities(this.coins);
    this.spawnEvery(spawn.tesla, this.teslas, Tesla);
    this.teslas = this.updateEntities(this.teslas);
    if (this.level.boss && !this.roundOver) {
      this.villain.update();
      // back to the main song once the boss intro is over
      if (!this.sounds.bossIntro.isPlaying() && !this.sounds.music.isPlaying()) {
        loopSound(this.sounds.music);
      }
    }
    this.player.update();
    this.updatePlayerBullets();
    this.villain.bullets = this.updateEntities(this.villain.bullets);
    this.foreground.update();
    this.checkLevelUp();
    this.checkRoundOver();
  }

  // draw everything back to front, without changing any state
  render() {
    this.background.draw();
    [this.firstAids, this.obstacles, this.coins, this.teslas].forEach((list) => {
      list.forEach((entity) => entity.draw());
    });
    if (this.level.boss && !this.roundOver) {
      this.villain.draw();
    }
    this.player.draw();
    this.player.bullets.forEach((bullet) => bullet.draw());
    this.villain.bullets.forEach((bullet) => bullet.draw());
    this.foreground.draw();
    this.player.drawHealthBar();
    this.player.drawScore();
    this.drawLevel();
    if (this.roundOver) {
      background('rgba(0, 0, 0, 0.4)');
    }
  }

  spawnEvery(frames, list, EntityClass) {
    if (frames && frameCount % frames === 0) {
      list.push(new EntityClass());
    }
  }

  // move everything in the list, then drop what hit the player or left the screen
  updateEntities(list) {
    list.forEach((entity) => {
      entity.update();
    });
    return list.filter((entity) => {
      if (entity.hitRadius && centersWithin(entity, this.player, entity.hitRadius)) {
        entity.hitPlayer(this.player);
        return false;
      }
      return entity.x > -entity.width;
    });
  }

  checkRoundOver() {
    if (this.roundOver) {
      // after a win the game keeps running for the coin rain
      if (frameCount % 10 === 0) {
        this.coins.push(new WinnerCoin());
      }
      if (!this.sounds.winnerSong.isPlaying()) {
        playSound(this.sounds.winnerSong);
      }
      return;
    }
    if (this.player.health <= 0) {
      this.endRound('.gameover');
      playSound(this.sounds.gameOver);
      noLoop();
    } else if (this.villain.health <= 0) {
      this.endRound('.won');
    }
  }

  endRound(overlay) {
    this.roundOver = true;
    document.querySelector(overlay).style.display = 'block';
    this.obstacles = [];
    this.coins = [];
    this.firstAids = [];
    this.teslas = [];
    this.player.bullets = [];
    this.villain.bullets = [];
    this.pauseMusic();
  }

  updatePlayerBullets() {
    this.player.bullets.forEach((bullet) => {
      bullet.update();
    });
    this.player.bullets = this.player.bullets.filter((bullet) => {
      if (bullet.x > width) return false;
      const target = this.obstacles.find((obs) => centersWithin(bullet, obs, bullet.hitRadius));
      if (target) {
        game.sounds.blop.setVolume(0.4);
        game.sounds.blop.play();
        this.obstacles = this.obstacles.filter((obs) => obs !== target);
        return false;
      }
      return true;
    });
  }

  drawLevel() {
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
