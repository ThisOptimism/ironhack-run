class Sounds {
  constructor() {
    this.song;
  }

  setup() {
    this.song.play()
  }
  preload() {
    soundFormats('mp3', 'ogg');
    this.song = loadSound('assets/sound/song.mp3');
  }
}