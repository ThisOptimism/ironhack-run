class Game {
  constructor() {
    this.playerImage
    this.obstacles = [];

  }
  preload() {
    // neuro = loadFont('assets/fonts/neuropol.ttf');
    this.playerImage = loadImage('assets/images/Steffen.gif')
  }
  setup() {
    this.player = new Player();

  }
  levelDraw() {
    push()
    fill('black');
    text(`LEVEL ${this.player.level}`, 460, 50)
    pop()
  }

  draw() {
    if (frameCount % 200 === 0) {
      this.obstacles.push(this.obstacle = new Obstacles());
    }

    this.obstacles = this.obstacles.filter(obstacle => {
      if (this.obstacle.collision(this.player) || this.obstacle.x < 0) {
        return false
      } else {
        return true
      }
    })

    this.obstacles.forEach(obs => {
      obs.draw();
    })

    this.player.healthBarDraw();
    this.player.draw();
    this.player.scoreDraw();
    this.levelDraw();
  }
}