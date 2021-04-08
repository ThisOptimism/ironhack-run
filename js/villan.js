class Villan {
  constructor() {
    this.x = 850;
    this.y = 370;
    this.width = 100;
    this.height = 200;
    this.damage = 20;
    this.health = 150;
    this.velocity = 0;
    this.gravity = 0.6;
    this.villianIamge;
    this.speed = 0.5;
    this.bullets = [];
  }

  draw() {
    // gravity
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y += this.gravity;
    this.y = constrain(this.y, 0, height - this.height - 30);
    // health bar
    this.healtBar();
    image(game.villanImg, this.x, this.y, this.width, this.height)

    // move left - right
    this.x += this.speed;
    if (this.x > 870) {
      this.speed -= 1;
    }
    if (this.x < 820) {
      this.speed += 0.1;
    }
    this.getDamage();
    if (frameCount % 246 === 0) {
      this.jump();
    }
    if (frameCount % 170 === 0) {
      this.bullets.push(this.bullet = new ShotVillan())
    }

  }

  getDamage() {
    game.player.bullets.forEach(bullet => {
      const villanX = this.x + this.width / 2;
      const villanY = this.y + this.height / 2;
      const bulletX = bullet.x + bullet.width / 2;
      const bulletY = bullet.y + bullet.height / 2;
      if (dist(villanX + 10, villanY - 20, bulletX, bulletY) > 90) {
        return false
      } else {
        game.villanHurt.play();
        this.health -= 10;
        game.player.bullets.splice(game.player.bullets.indexOf(bullet), 1)
        return true
      }
    })
  }

  healtBar() {

    push()
    stroke('black')
    fill('white')
    rect(this.x - 25, this.y - 21, 150, 12);
    pop()

    push();
    noStroke();
    fill('rgb(0,255,0)');
    rect(this.x + 1 - 25, this.y - 20, this.health - 2, 10);
    pop();

    push();
    textSize('25');
    text('FIGHT ELON', 435, 120);
    pop();
  }

  jump() {
    this.velocity = -21;
  }
}