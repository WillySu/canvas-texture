import TransparentTexture from "./TransparentTexture.js";
import { drawLines } from "./utils.js";

export const DIRECTIONS = {
  TOP: 0,
  LEFT: 0.5,
  BOTTOM: 1,
  RIGHT: -0.5
};

export default class SymboleTexture extends TransparentTexture {  
  constructor ({
    width,
    height,
    direction = DIRECTIONS.TOP,
    fillStyle = "green",
    strokeStyle = "black",
    paddingRatio = 0.1
  } = {}) {
    super({ width, height });
    this.direction = direction;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.paddingRatio = paddingRatio;
    this.halfW = this.width / 2;
    this.halfH = this.height / 2;
    this.marginW = this.width * this.paddingRatio;
    this.marginH = this.height * this.paddingRatio;

    this.render();
  }

  render () {
    const { halfW, halfH, direction } = this;
    this.context.translate(halfW, halfH);
    this.context.rotate(Math.PI * direction);
    this.context.translate(-halfW, -halfH);
  }
}
