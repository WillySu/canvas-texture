import TransparentCanvas from "../canvas/TransparentCanvas.js";
import {
  TopTriangle,
  RightTriangle,
  BottomTriangle,
  LeftTriangle
} from "../../modules/texture/TriangleTexture/index.js";

export default class BaseControlPad extends TransparentCanvas {
  constructor ({ width, height } = {}) {
    super({ width, height });
    this.halfW = this.width / 2;
    this.halfH = this.height / 2;
    this.quarterW = this.width / 4;
    this.quarterH = this.height / 4;
    this.ChevronUp = new TopTriangle({
      width: this.halfW,
      height: this.halfH
    });
    this.ChevronRight = new RightTriangle({
      width: this.quarterW,
      height: this.height
    });
    this.ChevronBottom = new BottomTriangle({
      width: this.halfW,
      height: this.halfH
    });
    this.ChevronLeft = new LeftTriangle({
      width: this.quarterW,
      height: this.height
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
      quarterW,
      halfH,
    } = this;

    this.clear();

    context.drawImage(CU.canvas, quarterW, 0);
    context.drawImage(CL.canvas, 0, 0);
    context.drawImage(CB.canvas, quarterW, halfH);
    context.drawImage(CR.canvas, width - quarterW, 0);
  }
}
