import Game from "../../modules/sokoban/Game.js";

function init () {
  const game = new Game();
  document.body.appendChild(game.div);
}

window.addEventListener("DOMContentLoaded", init);
