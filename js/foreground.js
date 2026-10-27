class Foreground {
  constructor() {
    this.x = 0;
    this.animalX = 0;
  }

  setLevel(art, scrolls) {
    this.image = art.foreground;
    this.animal = art.animal;
    this.scrolls = scrolls;
    if (!scrolls) {
      this.x = 0;
      this.animalX = 0;
    }
  }

  update() {
    if (!this.scrolls) return;

    this.animalX -= 7;
    if (this.animalX <= -width - 2000) {
      this.animalX = 0
    }
    this.x -= 6;
    if (this.x <= -width) {
      this.x = 0
    }
  }

  draw() {
    image(this.animal, this.animalX + 400, 0, width, height);
    image(this.image, this.x, 0, width, height);
    image(this.image, this.x + width, 0, width, height);
  }
}
