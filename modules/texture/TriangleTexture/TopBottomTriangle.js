import SymboleTexture from "../SymboleTexture.js";
import { drawLines } from "../utils.js";

export default class TopBottomTriangle extends SymboleTexture {
  render () {
    super.render();

    const { width, height, halfW, marginW, marginH, fillStyle, strokeStyle } = this;

    this.context.lineWidth = 3;
    drawLines({
      context: this.context,
      points: [
        [halfW, marginH],
        [width - marginW, height - marginH],
        [marginW, height - marginH],
        [halfW, marginH]
      ],
      fillStyle,
      strokeStyle
    });
  }
}
