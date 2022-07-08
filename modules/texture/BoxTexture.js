import BaseTexture from "./BaseTexture.js";
import { drawLines } from "./utils.js";

export default class BoxTexture extends BaseTexture {
  constructor ({ width, height, borderRatio } = {}) {
    super({ width, height });
    this.borderRatio = borderRatio || 0.1;
  }

  render () {
    this.context.strokeStyle = 'black';
    const factorW = this.width * this.borderRatio;
    const factorH = this.height * this.borderRatio;
    const factorWEnd = this.width - factorW * 2;
    const factorHEnd = this.height - factorH * 2;

    this.context.lineWidth = 3;
    this.context.strokeRect(0, 0, this.width, this.height);
    this.context.strokeRect(factorW, factorH, factorWEnd, factorHEnd);

    this.context.lineWidth = 1;
    drawLines({
      context: this.context,
      points: [
        [factorW, factorH],
        [this.width - factorW, this.height - factorH]
      ]
    });
    drawLines({
      context: this.context,
      points: [
        [this.width - factorW, factorH],
        [factorW, this.height - factorH]
      ]
    });
  }
}
