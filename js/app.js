document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.menu').style.display = "none";
    console.log(game.player.score)
  }
})