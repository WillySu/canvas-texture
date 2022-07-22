import SymboleTexture from "./SymboleTexture.js";
import { drawLines } from "./utils.js";

export default class ArrowTexture extends SymboleTexture {
  render () {
    super.render();
    const { width, height, halfW, halfH, marginW, marginH, fillStyle, strokeStyle } = this;

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
