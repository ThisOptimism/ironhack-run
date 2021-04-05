class Game {
  constructor() {
    this.playerImage;
    this.firstAidImage;
    this.obstacleImage;
    this.obstacles = [];
    this.firstAidArr = [];

  }
  preload() {
    // neuro = loadFont('assets/fonts/neuropol.ttf');
    this.playerImage = loadImage('assets/images/steffen.gif');
    this.firstAidImage = loadImage('assets/images/pizza.png');
    this.obstacleImage = loadImage('assets/images/coronavirus.png')
  }
  setup() {
    this.player = new Player();
  }

  levelDraw() {
    push();
    fill('black');
    text(`LEVEL ${this.player.level}`, 460, 50);
    pop();
  }

  draw() {
    this.player.healthBarDraw();
    this.player.draw();
    this.player.scoreDraw();
    this.levelDraw();
  }

  drawObstacles() {
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
  }
  drawFirstAid() {
    if (frameCount % 10000 === 0) {
      this.firstAidArr.push(this.firstAid = new firstAid());
    }
    this.firstAidArr = this.firstAidArr.filter(firstAid => {
      if (this.firstAid.collision(this.player) || this.firstAid.x < 0) {
        return false
      } else {
        return true
      }
    })
    this.firstAidArr.forEach(firstAid => {
      firstAid.draw();
    })
  }
}