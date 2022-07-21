import BaseTexture from "./BaseTexture.js";
import { drawLines, drawRect } from "./utils.js";

export const DIRECTIONS = {
  TOP: 0,
  LEFT: 0.5,
  BOTTOM: 1,
  RIGHT: -0.5
};

export default class WoodenBoxTexture extends BaseTexture {
  constructor ({
    width,
    height,
    direction = DIRECTIONS.TOP,
    fillStyle = "green",
    strokeStyle = "black",
    ratio = 0.1
  } = {}) {
    super({ width, height });
    this.direction = direction;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.ratio = ratio;

    this.render();
  }

  render () {
    const { width, height, ratio, fillStyle, strokeStyle, direction } = this;
    const halfW = width / 2;
    const halfH = height / 2;
    const marginW = width * ratio;
    const marginH = height * ratio;

    this.context.translate(halfW, halfH);
    this.context.rotate(Math.PI * direction);
    this.context.translate(-halfW, -halfH);

    this.context.lineWidth = 1;
    drawRect({
      context: this.context,
      x: 0,
      y: 0,
      width,
      height,
      fillStyle: "white"
    });

    this.context.lineWidth = 3;
    drawLines({
      context: this.context,
      points: [
        [halfW, marginH],
        [width - marginW, halfH],
        [halfW + marginW, halfH],
        [halfW + marginW, height - marginH],
        [halfW - marginW, height - marginH],
        [halfW - marginW, halfH],
        [marginW, halfH],
        [halfW, marginH]
      ],
      fillStyle,
      strokeStyle
    });
  }
}
