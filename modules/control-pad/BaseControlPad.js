import TransparentCanvas from "../canvas/TransparentCanvas.js";
import {
  TopTriangle,
  RightTriangle,
  BottomTriangle,
  LeftTriangle
} from "../../modules/texture/TriangleTexture/index.js";

export const DIRECTIONS = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};

export default class BaseControlPad extends TransparentCanvas {
  constructor ({
    width,
    height,
    onArrowClick = (direction) => console.log(direction)
  } = {}) {
    super({ width, height });
    this.onArrowClick = onArrowClick;
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
    const threeQuarterW = width - quarterW;

    this.clear();

    context.drawImage(CU.canvas, quarterW, 0);
    context.drawImage(CL.canvas, 0, 0);
    context.drawImage(CB.canvas, quarterW, halfH);
    context.drawImage(CR.canvas, threeQuarterW, 0);

    this.onClick = (ev) => {
      const { offsetX, offsetY } = ev;
      if (offsetX < quarterW) {
        return this.onArrowClick(DIRECTIONS.LEFT);
      } else if (offsetX > threeQuarterW) {
        return this.onArrowClick(DIRECTIONS.RIGHT);
      } else if (offsetY < halfH) {
        return this.onArrowClick(DIRECTIONS.TOP);
      }

      return this.onArrowClick(DIRECTIONS.BOTTOM);
    }
  }
}
