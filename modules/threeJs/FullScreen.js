import SimplePreview from "./SimplePreview.js";

export default class FullScreen extends SimplePreview {
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
