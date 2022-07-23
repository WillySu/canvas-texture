import SymboleTexture from "./SymboleTexture.js";
import { drawLines } from "./utils.js";

export default class TriangleTexture extends SymboleTexture {
  render () {
    super.render();

    const { width, height, halfW, halfH, marginW, marginH, fillStyle, strokeStyle } = this;
    const moreMarginH = marginH * 2;

    this.context.lineWidth = 3;
    drawLines({
      context: this.context,
      points: [
        [halfW, moreMarginH],
        [width - marginW, height - moreMarginH],
        [marginW, height - moreMarginH],
        [halfW, moreMarginH]
      ],
      fillStyle,
      strokeStyle
    });
  }
}
