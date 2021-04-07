class Villan {
  constructor() {
    this.x = 850;
    this.y = 370;
    this.width = 100;
    this.height = 200;
    this.health = 150;
    this.villianIamge;
    this.speed = 1;
  }
  draw() {
    rect(this.x, this.y, this.width, this.height)
    this.x += this.speed;
    if (this.x > 870) {
      this.speed -= 1;
    }
    if (this.x < 820) {
      this.speed += 0.1;
    }
  }
}