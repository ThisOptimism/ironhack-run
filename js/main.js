const game = new Game();

function setup() {

  createCanvas(1000, 600)
}

function preload() {
  game.preload();
  game.setup()
}

function draw() {
  clear();
  background('grey')

  game.drawObstacles();
  game.drawFirstAid();
  game.draw();

}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
}