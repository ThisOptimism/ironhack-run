const game = new Game();
let song;
let menuSong;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('game')
  // browsers keep audio muted until the first click or key press
  userStartAudio();

  // music is big, so it loads in the background instead of blocking the first frame
  menuSong = loadSound("assets/sound/song1.m4a", () => {
    if (game.mode === 0) menuSong.loop();
  });
  song = loadSound("assets/sound/song.mp3");
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
  return dist(a.x + a.width / 2, a.y + a.height / 2, b.x + b.width / 2, b.y + b.height / 2) <= radius;
}

function draw() {
  clear();
  game.draw();
}

function keyPressed() {
  game.player.keyIsPressed();
  if (keyCode === 27 && game.mode == 1) {
    game.mode = 2;
    game.pauseMusic();
  }

  if (keyCode === ENTER && !game.isOver()) {
    game.mode = 1
    menuSong.pause();
    game.resumeMusic();
    loop()
  }
}
