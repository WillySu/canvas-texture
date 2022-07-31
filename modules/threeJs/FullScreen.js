import SimplePreview from "./SimplePreview.js";

const DEFAULT_CAMERA_POSITION = {
  x: 128,
  y: 128,
  z: 256
};

export default class FullScreen extends SimplePreview {
  constructor ({ cameraPosition } = {}) {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      cameraPosition: cameraPosition || DEFAULT_CAMERA_POSITION
    })

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize () {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.resize();
  }
}
