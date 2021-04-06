const game = new Game();
const background = new Background();
let mode;

function setup() {
  mode = 0
  createCanvas(1000, 600);
  textSize(21)

}

function preload() {
  game.preload();
  game.setup();
}

function draw() {
  clear();
  if (mode === 0) {
    textSize()
    text('Press enter to start', 20, 30);

  };
  if (mode === 1) {
    game.draw();
    frameRate(60)
  }
  if (mode === 2) {
    game.draw();
    frameRate(0)
    textSize(32)
    text('- PAUSE -', 430, 300)
    textSize(16)
    text('Press ENTER to continue', 410, 330)
  }
}


function keyPressed() {
  if (keyCode === 27 && mode == 1) {
    mode = 2;
  }

  if (keyCode === ENTER) {
    mode = 1
    frameRate(50)
  }

  if (keyCode === 32) {
    game.player.jump();
  }
}