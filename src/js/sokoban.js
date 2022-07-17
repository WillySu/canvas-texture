import FullScreen from "../../modules/threeJs/FullScreen.js";

function init () {
  const fullScreen = new FullScreen({
    cameraPosition: { x: 64, y: 64, z: 128 }
  });

  fullScreen.parent = document.body;
}

window.addEventListener("DOMContentLoaded", init);
