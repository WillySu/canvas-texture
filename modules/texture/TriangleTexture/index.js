import { DIRECTIONS } from "../SymboleTexture.js";
import LeftRightTriangle from "./LeftRightTriangle.js";
import TopBottomTriangle from "./TopBottomTriangle.js";

export class TopTriangle extends TopBottomTriangle {
  constructor ({ ...params } = {}) {
    super({
      ...params,
      direction: DIRECTIONS.TOP
    });
  }
}

export class RightTriangle extends LeftRightTriangle {
  constructor ({ ...params } = {}) {
    super({
      ...params,
      direction: DIRECTIONS.TOP // no rotation
    });
  }
}

export class BottomTriangle extends TopBottomTriangle {
  constructor ({ ...params } = {}) {
    super({
      ...params,
      direction: DIRECTIONS.BOTTOM
    });
  }
}

export class LeftTriangle extends LeftRightTriangle {
  constructor ({ ...params } = {}) {
    super({
      ...params,
      direction: DIRECTIONS.BOTTOM // rotate 180 deg
    });
  }
}
