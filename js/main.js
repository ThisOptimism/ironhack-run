const game = new Game();

function setup() {

  createCanvas(1000, 600)
}

function preload() {
  game.preload();
  game.setup()
}

function draw() {
  clear()
  game.draw()
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
  // if (keyCode === 68) {
  //   game.player.x += 1
  // }
}