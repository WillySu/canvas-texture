import FullScreen from "../../modules/threeJs/FullScreen.js";

function init () {
  const fullScreen = new FullScreen();
  fullScreen.parent = document.body;
}

window.addEventListener("DOMContentLoaded", init);
