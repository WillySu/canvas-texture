import SokobanMap from "../../modules/sokoban/SokobanMap.js";
import FullScreen from "../../modules/threeJs/FullScreen.js";

function init () {
  const sokobanMap = new SokobanMap();
  sokobanMap.render();

  const fullScreen = new FullScreen({
    cameraPosition: { x: 128, y: 128, z: 256 }
  });

  fullScreen.add(sokobanMap.map);
  fullScreen.parent = document.body;
}

window.addEventListener("DOMContentLoaded", init);
