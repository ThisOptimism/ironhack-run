// Everything is loaded by name into game.images and game.sounds.
// Level scenery is listed in levels.js instead.
const IMAGES = {
  player: 'assets/images/steffen.gif',
  villain: 'assets/images/elon.gif',
  coin: 'assets/images/lab.png',
  winnerCoin: 'assets/images/winnercoin.png',
  firstAid: 'assets/images/pizza.png',
  obstacle: 'assets/images/coronavirus.png',
  shot: 'assets/images/shot.png',
  tesla: 'assets/images/tesla.png',
  teslaLogo: 'assets/images/logotesla.png',
};

// small sounds, loaded before the first frame
const SOUNDS = {
  coin: 'assets/sound/coin.wav',
  hit: 'assets/sound/hit.wav',
  jump: 'assets/sound/jump.wav',
  blop: 'assets/sound/blop.wav',
};

// big sounds, loaded in the background so they don't delay the first frame
const BACKGROUND_SOUNDS = {
  music: 'assets/sound/song.mp3',
  shot: 'assets/sound/shot.wav',
  eat: 'assets/sound/eat.wav',
  villainHurt: 'assets/sound/villainhurt.wav',
  bossIntro: 'assets/sound/bossintro.m4a',
  gameOver: 'assets/sound/gameover.wav',
  winnerSong: 'assets/sound/winnersong.mp3',
};
