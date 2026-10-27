class Background {
  constructor() {
    this.layers = [];
    this.turns = 0;
  }

  setLevel(art) {
    this.layers = art.layers.map(layer => ({ ...layer, x: 0 }));
    this.turns = 0;
  }

  update() {
    this.layers.forEach(layer => {
      layer.x -= layer.speed * game.gameSpeed
      if (layer.x <= -width) {
        layer.x = 0;
        this.turns++
      }
    })
  }

  draw() {
    this.layers.forEach(layer => {
      image(layer.img, layer.x, 0, width, height)
      image(layer.img, layer.x + width, 0, width, height)
    })
  }
}
