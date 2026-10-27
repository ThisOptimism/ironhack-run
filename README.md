# IRONHACK RUN: A 2D Side-Scroller Game
IRONHACK RUN is an exciting 2D side-scroller game that I developed during my time at the Ironhack bootcamp. In this game, players take on the role of a brave hero tasked with defeating the coronavirus, fighting a villain and saving the world.

Using HTML, CSS, and JavaScript, along with the P5.js library, I created a visually appealing and interactive game environment. Players can jump and shoot projectiles to eliminate the coronavirus as they progress through three challenging levels.

The game features smooth animations, responsive controls, and engaging gameplay mechanics. Players must jump over obstacles and strategically defeat the coronavirus using their shooting abilities. Each level becomes progressively more difficult, culminating in an epic boss battle at the end.

The visual design, implemented with CSS, adds vibrancy and excitement to the game, immersing players in a world filled with infectious challenges.

## How to Play
The game loads images and sounds, so it has to be served over HTTP. Opening `index.html` directly from the file system won't work. From the project folder, start any static server, for example:

```sh
npx serve .
# or
python3 -m http.server
```

Then open the printed URL in your browser.

| Key   | Action                          |
|-------|---------------------------------|
| ENTER | Start / continue                |
| A / D | Move left / right               |
| SPACE | Jump                            |
| P     | Shoot (each shot costs 1 coin)  |
| ESC   | Pause                           |
