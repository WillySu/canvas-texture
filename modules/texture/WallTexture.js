import BaseTexture from "./BaseTexture.js";
import { drawRects } from "./utils.js";

export default class WallTexture extends BaseTexture {
  constructor ({ width, height } = {}) {
    super({ width, height });
  }

  render () {
    this.context.strokeStyle = 'black';

    this.context.lineWidth = 3;
    this.context.strokeRect(0, 0, this.width, this.height);

    this.context.lineWidth = 1;
    drawRects({
      context: this.context,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      numOfRow: 6,
      numOfCol: 3,
    });
  }
}
