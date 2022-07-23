import Canvas from "../Canvas.js";
import { DIRECTIONS } from "../texture/SymboleTexture.js";
import TriangleTexture from "../texture/TriangleTexture.js";

export default class BaseControlPad extends Canvas {
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

    CU.getImg().addEventListener("load", () => {
      context.drawImage(CU.getImg(), quarterW, 0);
    });

    CL.getImg().addEventListener("load", () => {
      context.drawImage(CL.getImg(), 0, 0, quarterW, height);
    });

    CB.getImg().addEventListener("load", () => {
      context.drawImage(CB.getImg(), quarterW, halfH);
    });

    CR.getImg().addEventListener("load", () => {
      context.drawImage(CR.getImg(), width - quarterW, 0, quarterW, height);
    });
  }
}
