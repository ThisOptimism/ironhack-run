// Each level's scenery, speed and spawn rates.
// Background layers are listed back to front, speed is pixels per frame.
// Spawn rates are "one every N frames", null means it doesn't spawn in that level.
// A level ends once its background layers have wrapped around `turns` times.
const LEVELS = [{
    folder: 'day',
    layers: [{ file: 'bg4.png', speed: 1 }, { file: 'bg3.png', speed: 1.5 }, { file: 'bg2.png', speed: 2 }, { file: 'bg1.png', speed: 6 }],
    animal: 'assets/images/background/day/dog.gif',
    foregroundScrolls: true,
    turns: 30,
    gameSpeed: 1,
    playerSpeed: { left: 13, right: 5 },
    spawn: { obstacle: 100, coin: 181, firstAid: 834, tesla: null },
    boss: false
  },
  {
    folder: 'night',
    layers: [{ file: 'bg4.png', speed: 1 }, { file: 'bg3.png', speed: 1.5 }, { file: 'bg2.png', speed: 2 }, { file: 'bg1.png', speed: 6 }],
    animal: 'assets/images/background/night/cat.gif',
    foregroundScrolls: true,
    turns: 30,
    gameSpeed: 1.4,
    playerSpeed: { left: 13, right: 5 },
    spawn: { obstacle: 110, coin: 181, firstAid: 834, tesla: 247 },
    boss: false
  },
  {
    folder: 'endgame',
    layers: [{ file: 'bg5.png', speed: 0 }, { file: 'bg4.png', speed: 1 }, { file: 'bg3.png', speed: 0 }, { file: 'bg2.png', speed: 0 }, { file: 'bg1.png', speed: 0 }],
    animal: 'assets/images/background/day/dog.gif',
    foregroundScrolls: false,
    turns: null,
    gameSpeed: 1,
    playerSpeed: { left: 10, right: 10 },
    spawn: { obstacle: null, coin: 181, firstAid: 834, tesla: 247 },
    boss: true
  }
]
