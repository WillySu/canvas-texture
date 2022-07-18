import SimplePreview from "./SimplePreview.js";

export default class FullScreen extends SimplePreview {
  constructor ({ cameraPosition } = {}) {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      cameraPosition: cameraPosition
    })

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize () {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.resize();
  }
}
