class Villain {
  constructor() {
    this.x = 850;
    this.y = 370;
    this.width = 100;
    this.height = 200;
    this.damage = 20;
    this.health = MAX_HEALTH;
    this.velocity = 0;
    this.gravity = 0.6;
    this.speed = 0.5;
    this.bullets = [];
  }

  update() {
    // gravity
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y += this.gravity;
    this.y = constrain(this.y, 0, height - this.height - GROUND_MARGIN);

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
      this.bullets.push(new ShotVillain())
    }
  }

  draw() {
    this.healthBar();
    image(game.villainImg, this.x, this.y, this.width, this.height)
  }

  getDamage() {
    // the hit area sits a bit above the center, around the head and body
    const villainX = this.x + this.width / 2 + 10;
    const villainY = this.y + this.height / 2 - 20;
    game.player.bullets = game.player.bullets.filter(bullet => {
      const hit = dist(villainX, villainY, bullet.x + bullet.width / 2, bullet.y + bullet.height / 2) <= 90;
      if (hit) {
        playSound(game.villainHurt);
        this.health -= 10;
      }
      return !hit;
    })
  }

  healthBar() {

    push()
    stroke('black')
    fill('white')
    rect(this.x - 25, this.y - 21, 150, 12);
    pop()

    push();
    noStroke();
    fill('rgb(0,255,0)');
    rect(this.x + 1 - 25, this.y - 20, (this.health / MAX_HEALTH) * 148, 10);
    pop();

    push();
    textSize(25);
    text('FIGHT ELON', 435, 120);
    pop();
  }

  jump() {
    this.velocity = -21;
  }
}
