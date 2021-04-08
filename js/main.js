const game = new Game();
let song;
let menuSong;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('game')

}

function preload() {
  menuSong = loadSound("assets/sound/song1.wav");
  song = loadSound("assets/sound/song.mp3");
  game.preload();
  game.setup();
}

function draw() {
  clear();
  if (!menuSong.isPlaying() && game.mode === 0) {
    menuSong.loop();
  }
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
    frameRate(60)
  }
}