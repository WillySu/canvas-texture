import TransparentCanvas from "../canvas/TransparentCanvas.js";
import { DIRECTIONS } from "../texture/SymboleTexture.js";
import TriangleTexture from "../texture/TriangleTexture.js";

export default class BaseControlPad extends TransparentCanvas {
  constructor ({ width, height }) {
    super({ width, height });
    this.halfW = this.width / 2;
    this.halfH = this.height / 2;
    this.quarterW = this.width / 4;
    this.quarterH = this.height / 4;
    this.ChevronUp = new TriangleTexture({
      width: this.halfW,
      height: this.halfH,
      direction: DIRECTIONS.TOP
    });
    this.ChevronRight = new TriangleTexture({
      width: this.width,
      height: this.height,
      direction: DIRECTIONS.RIGHT
    });
    this.ChevronBottom = new TriangleTexture({
      width: this.halfW,
      height: this.halfH,
      direction: DIRECTIONS.BOTTOM
    });
    this.ChevronLeft = new TriangleTexture({
      width: this.width,
      height: this.height,
      direction: DIRECTIONS.LEFT
    });

    this.render();
  }

  render () {
    const {
      context,
      ChevronUp: CU,
      ChevronRight: CR,
      ChevronBottom: CB,
      ChevronLeft: CL,
      width,
      height,
      quarterW,
      halfH,
    } = this;

    context.drawImage(CU.canvas, quarterW, 0);
    context.drawImage(CL.canvas, 0, 0, quarterW, height);
    context.drawImage(CB.canvas, quarterW, halfH);
    context.drawImage(CR.canvas, width - quarterW, 0, quarterW, height);
  }
}
