class Player {
  constructor() {
    this.x = 30;
    this.y = 400;
    this.height = 200;
    this.width = 100;
    this.score = 0;
    this.health = MAX_HEALTH;
    this.gravity = 0.6;
    this.velocity = 0;
    this.bullets = [];
    this.moveRightSpeed = 5;
    this.moveLeftSpeed = 13;
  }

  update() {
    if (keyIsDown(KEY.A) && this.x >= 5) this.moveLeft();
    if (keyIsDown(KEY.D) && this.x <= width - this.width) this.moveRight();
    if (keyIsDown(KEY.SPACE)) this.jump();

    //  gravity
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y += this.gravity
    this.y = constrain(this.y, 0, this.groundY())
  }

  draw() {
    image(game.playerImage, this.x, this.y, this.width, this.height)
  }

  scoreDraw() {
    textSize(26);
    image(game.coinImage, 880, 28, 36, 27)
    text(`${this.score}`, 930, 50);
  }

  healthBarDraw() {
    // white bar / frame
    push()
    stroke('black')
    fill('white')
    rect(20, 30, 150, 20)
    pop()

    // green bar
    push()
    noStroke()
    fill('rgb(0,255,0)')
    rect(21, 31, (this.health / MAX_HEALTH) * 148, 18)
    pop()

    // red cross
    push()
    fill('red')
    noStroke()
    rect(190, 30, 6, 20)
    rect(183, 37.5, 20, 6)
    pop()
  }
  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
  }
  heal(amount) {
    this.health = Math.min(MAX_HEALTH, this.health + amount);
  }
  moveLeft() {
    this.x -= this.moveLeftSpeed * game.gameSpeed / 1.5
  }
  moveRight() {
    this.x += this.moveRightSpeed * game.gameSpeed / 1.5
  }
  groundY() {
    return height - this.height - GROUND_MARGIN;
  }
  canJump() {
    return this.y > this.groundY() - 10;
  }
  jump() {
    if (this.canJump())
      this.velocity = -19;
  }
  keyIsPressed() {
    if (keyCode === KEY.SPACE && this.canJump() && game.mode === MODE.PLAYING) {
      game.jumpSound.play();
    }
    if (keyCode === KEY.P && game.mode === MODE.PLAYING) {
      if (this.score > 0) {
        this.bullets.push(new Shot())
        game.shotSound.setVolume(0.3);
        playSound(game.shotSound);
        this.score--
      }
    }
  }
}
