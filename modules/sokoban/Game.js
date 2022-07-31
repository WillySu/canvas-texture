import ControlPad from "../control-pad/BaseControlPad.js"
import FullScreen from "../threeJs/FullScreen.js";
import FullScreenCanvas from "../canvas/FullScreenCanvas.js";
import SokobanMap from "./SokobanMap.js";

export default class Game {
  constructor ({ cameraPosition } = {}) {
    this.sokobanMap = new SokobanMap();
    this.sokobanMap.render();

    this.fullScreen = new FullScreen({ cameraPosition });
    this.fullScreen.add(this.sokobanMap.map);

    this.controlPad = new ControlPad({
      width: 256,
      height: 128,
      onArrowClick: (direction) => console.log("Move " + direction)
    });
    this.controlPad.canvas.classList.add("game-control-canvas");

    this.div = document.createElement("div");
    this.div.classList.add("game-div");

    this.render();
  }

  render () {
    const { controlPad, div, fullScreen } = this;
    fullScreen.parent = div;
    controlPad.parent = div;
  }
}
