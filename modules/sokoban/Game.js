import ControlPad, { DIRECTIONS } from "../control-pad/BaseControlPad.js"
import FullScreen from "../threeJs/FullScreen.js";
import SokobanMap from "./SokobanMap.js";
import { DEFAULT_MATRIX } from "./utils.js"

export default class Game {
  constructor ({
    cameraPosition,
    mapParams = { matrix: DEFAULT_MATRIX }
  } = {}) {
    this.sokobanMap = new SokobanMap(mapParams);
    this.sokobanMap.render();

    this.fullScreen = new FullScreen({ cameraPosition });
    this.fullScreen.add(this.sokobanMap.map);

    this.controlPad = new ControlPad({
      width: 256,
      height: 128,
      onArrowClick: (direction) => {
        let positions;
        if (direction === DIRECTIONS.TOP) {
          positions = this.canMoveTop();
        } else if (direction === DIRECTIONS.RIGHT) {
          positions = this.canMoveRight();
        } else if (direction === DIRECTIONS.BOTTOM) {
          positions = this.canMoveBottom();
        } else if (direction === DIRECTIONS.LEFT) {
          positions = this.canMoveLeft();
        }

        if (positions) {
          const [pos1, pos2] = positions;
          this.sokobanMap.swapPositions(pos1, pos2);
        }
      }
    });
    this.controlPad.canvas.classList.add("game-control-canvas");

    this.div = document.createElement("div");
    this.div.classList.add("game-div");

    this.render();
  }

  render () {
    const { controlPad, div, fullScreen } = this;
    fullScreen.parent = div;
    controlPad.parent = div;
  }

  get BLOCK_TILE_LIST () {
    return this.sokobanMap.BLOCK_TILE_LIST;
  }

  get TILES () {
    return this.sokobanMap.TILES;
  }

  get matrix () {
    return this.sokobanMap.matrix;
  }

  isOutsideOfMatrix({ row, col }) {
    return row < 0 ||
      row > this.matrix.length - 1 ||
      col < 0 ||
      col > this.matrix[row].length - 1;
  }

  canMove ({ curRow, curCol, rowAdjust, colAdjust, isSokoban = true }) {
    const newRow = curRow + rowAdjust;
    const newCol = curCol + colAdjust;
    const code = this.matrix[newRow][newCol];

    if (this.isOutsideOfMatrix({ row: newRow, col: newCol })) {
      return false; // outside of matrix
    } else if (this.BLOCK_TILE_LIST.includes(code)) {
      return false; // Cannot push Sokoban self, wall or unmovable box
    } else if (isSokoban && code === this.TILES.BOX) {
      // Only Sokoban can push the movable box
      const canPushBox = this.canMove({ curRow: newRow, curCol: newCol, rowAdjust, colAdjust, isSokoban: false });
      if (!canPushBox) {
        return false;
      }
    }

    return [
      { row: curRow, col: curCol },
      { row: newRow, col: newCol }
    ];
  }

  get sokobanRow () {
    return this.sokobanMap.sokobanRow;
  }

  get sokobanCol () {
    return this.sokobanMap.sokobanCol;
  }

  canMoveSokoban ({ rowAdjust, colAdjust }) {
    return this.canMove({
      curRow: this.sokobanRow,
      curCol: this.sokobanCol,
      rowAdjust,
      colAdjust,
      isSokoban: true
    });
  }

  canMoveLeft () {
    return this.canMoveSokoban({ rowAdjust: 0, colAdjust: -1 });
  }

  canMoveRight () {
    return this.canMoveSokoban({ rowAdjust: 0, colAdjust: 1 });
  }

  canMoveTop () {
    return this.canMoveSokoban({ rowAdjust: -1, colAdjust: 0 });
  }

  canMoveBottom () {
    return this.canMoveSokoban({ rowAdjust: 1, colAdjust: 0 });
  }
}
