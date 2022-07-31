import BaseCanvas from "./BaseCanvas.js";

export default class FullScreenCanvas extends BaseCanvas {
  constructor () {
    super({
      width: window.innerWidth,
      height: window.innerHeight
    })

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize () {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.resize();
  }
}
