import SymboleTexture from "../SymboleTexture.js";
import { drawLines } from "../utils.js";

export default class LeftRightTriangle extends SymboleTexture {
  render () {
    super.render();

    const { width, height, halfH, marginW, marginH, fillStyle, strokeStyle } = this;

    this.context.lineWidth = 3;
    drawLines({
      context: this.context,
      points: [
        [width - marginW, halfH],
        [marginW, height - marginH],
        [marginW, marginH],
        [width - marginW, halfH],
      ],
      fillStyle,
      strokeStyle
    });
  }
}
