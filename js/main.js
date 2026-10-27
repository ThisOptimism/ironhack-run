const game = new Game();

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('game');
  // browsers keep audio muted until the first click or key press
  userStartAudio();
  // big sounds load in the background instead of blocking the first frame
  game.loadSounds();
}

function preload() {
  game.preload();
  game.setup();
}

// sounds loaded in setup() may still be downloading, play them only once ready
function playSound(sound) {
  if (sound.isLoaded()) sound.play();
}

function loopSound(sound) {
  if (sound.isLoaded()) sound.loop();
}

// true when the centers of a and b are at most `radius` apart
function centersWithin(a, b, radius) {
  return (
    dist(a.x + a.width / 2, a.y + a.height / 2, b.x + b.width / 2, b.y + b.height / 2) <= radius
  );
}

function draw() {
  clear();
  game.draw();
}

function keyPressed() {
  game.player.handleKey();
  if (keyCode === ESCAPE && game.mode === MODE.PLAYING) {
    game.mode = MODE.PAUSED;
    game.pauseMusic();
  }

  if (keyCode === ENTER && !game.isOver()) {
    document.querySelector('.menu').style.display = 'none';
    game.mode = MODE.PLAYING;
    game.sounds.menuMusic.pause();
    game.resumeMusic();
    loop();
  }
}
