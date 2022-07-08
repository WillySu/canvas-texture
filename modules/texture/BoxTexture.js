import BaseTexture from "./BaseTexture.js";
import { drawLines, drawRect } from "./utils.js";

export default class BoxTexture extends BaseTexture {
  constructor ({
    width,
    height,
    borderRatio = 0.1,
    innerColor = "#806517",
    outerColor = "#966F33"
  } = {}) {
    super({ width, height });
    this.borderRatio = borderRatio;
    this.innerColor = innerColor;
    this.outerColor = outerColor;
  }

  render () {
    const factorW = this.width * this.borderRatio;
    const factorH = this.height * this.borderRatio;
    const factorWEnd = this.width - factorW * 2;
    const factorHEnd = this.height - factorH * 2;

    this.context.lineWidth = 3;
    drawRect({
      context: this.context,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fillStyle: this.outerColor
    });
    drawRect({
      context: this.context,
      x: factorW,
      y: factorH,
      width: factorWEnd,
      height: factorHEnd,
      fillStyle: this.innerColor
    });

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
