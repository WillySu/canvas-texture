import BaseTexture from "./BaseTexture.js";
import { DEG_180, drawCircle, drawLines } from "./utils.js";

export default class SmileFaceTexture extends BaseTexture {
  constructor ({
    width,
    height,
    faceColor = "#FFF380",
    strokeFill = "black"
  } = {}) {
    super({ width, height });
    this.faceColor = faceColor;
    this.strokeFill = strokeFill;
  }

  render () {
    this.context.fillStyle = this.faceColor;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.lineWidth = 3;
    const oneQuarterW = this.width / 4;
    const oneQuarterH = this.height / 4;
    const xRadius = oneQuarterW / 2;
    const yRadius = oneQuarterH / 2;

    // left eye
    drawCircle({
      context: this.context,
      x: oneQuarterW,
      y: oneQuarterH * 1.5,
      xRadius,
      yRadius,
      fillStyle: this.strokeFill
    });

    // right eye
    drawCircle({
      context: this.context,
      x: oneQuarterW * 3,
      y: oneQuarterH * 1.5,
      xRadius,
      yRadius,
      fillStyle: this.strokeFill
    });

    // Nose
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const noseW = this.width / 16;
    const noseH = this.height / 16;
    drawLines({
      context: this.context,
      points: [
        [halfW, halfH - noseH],
        [halfW + noseW, halfH + noseH],
        [halfW - noseW, halfH + noseH],
        [halfW, halfH - noseH]
      ],
      fillStyle: "black"
    });

    // Mouse
    drawCircle({
      context: this.context,
      x: halfW,
      y: this.width * 0.65,
      xRadius: this.width * 0.4,
      yRadius: oneQuarterH,
      fillStyle: this.strokeFill,
      startAngle: DEG_180
    });
  }
}
