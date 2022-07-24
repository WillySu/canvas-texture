import BaseCanvas from "../canvas/BaseCanvas.js";
import { drawRects } from "./utils.js";

export default class WoodenWallTexture extends BaseCanvas {
  constructor ({ width, height, fillStyle } = {}) {
    super({ width, height });
    this.fillStyle = fillStyle || "#966F33";

    this.render();
  }

  render () {
    this.context.strokeStyle = 'black';

    this.context.lineWidth = 1;
    drawRects({
      context: this.context,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      numOfRow: 6,
      numOfCol: 2,
      fillStyle: this.fillStyle
    });

    this.context.lineWidth = 3;
    this.context.strokeRect(0, 0, this.width, this.height);
  }
}
