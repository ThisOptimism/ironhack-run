const game = new Game();
let song;
let menuSong;

function setup() {
  createCanvas(1000, 600);
  if (menuSong.isLoaded()) {
    menuSong.loop();
  }
}

function preload() {
  menuSong = loadSound("assets/sound/song1.wav");
  song = loadSound("assets/sound/song.mp3");
  game.preload();
  game.setup();
}

function draw() {
  clear();
  game.draw();
}

function keyPressed() {
  game.player.keyIsPressed();
  if (keyCode === 27 && game.mode == 1) {
    game.mode = 2;
    song.pause();
  }

  if (keyCode === ENTER) {
    game.mode = 1
    if (!song.isPlaying()) {
      song.setVolume(0.6);
      song.loop();
      menuSong.pause();
    }
    frameRate(50)
  }
}