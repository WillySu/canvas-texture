import BaseCanvas from "../canvas/BaseCanvas.js";
import { drawRects } from "./utils.js";

export default class CeramicTileTexture extends BaseCanvas {
  constructor ({ width, height, fillStyle } = {}) {
    super({ width, height });
    this.fillStyle = fillStyle || "#786D5F";

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
      numOfRow: 3,
      numOfCol: 3,
      fillStyle: this.fillStyle
    });

    this.context.lineWidth = 3;
    this.context.strokeRect(0, 0, this.width, this.height);
  }
}
