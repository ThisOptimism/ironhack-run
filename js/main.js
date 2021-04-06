const game = new Game();
let song;
let mode;

function setup() {
  mode = 0
  createCanvas(1000, 600);
  textSize(21);
}

function preload() {
  song = loadSound("assets/sound/song.mp3");
  game.preload();
  game.setup();
}

function draw() {
  clear();
  if (mode === 0) {
    textSize()
    text('Press "Enter" to start', 20, 30);
  };
  if (mode === 1) {
    game.draw();
    frameRate(60)
  }
  if (mode === 2) {
    game.draw();
    frameRate(0);
    textSize(32);
    text('- PAUSE -', 430, 300);
    textSize(16);
    text('Press "Enter" to resume', 410, 330)
  }
}

function keyPressed() {
  if (keyCode === 27 && mode == 1) {
    mode = 2;
    song.pause();
    let menu = document.querySelector('.menu')
    // menu.style.display = 'block';
  }

  if (keyCode === ENTER) {
    mode = 1
    if (!song.isPlaying()) {
      // song.setVolume(0.6);
      // song.loop();
    }
    frameRate(50)
  }
}