import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import BasicMap from "./BasicMap.js";
import {
  DEFAULT_BLOCK_TILE_LIST,
  DEFAULT_EXIT_TILE_LIST,
  DEFAULT_MATERIALS_MAP,
  DEFAULT_MATRIX,
  DEFAULT_TILES
} from "./utils.js"

export default class SokobanMap extends BasicMap {
  constructor ({
    side = 18,
    matrix = DEFAULT_MATRIX,
    TILES = DEFAULT_TILES,
    MATERIALS_MAP = DEFAULT_MATERIALS_MAP,
    BLOCK_TILE_LIST = DEFAULT_BLOCK_TILE_LIST,
    EXIT_TILE_LIST = DEFAULT_EXIT_TILE_LIST,
  } = {}) {
    super({
      side,
      numOfCol: matrix[0].length,
      numOfRow: matrix.length
    })

    this.matrix = matrix;
    this.TILES = TILES;
    this.MATERIALS_MAP = MATERIALS_MAP;
    this.BLOCK_TILE_LIST = BLOCK_TILE_LIST;
    this.EXIT_TILE_LIST = EXIT_TILE_LIST;
    this.sokobanRow;
    this.sokobanCol;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === TILES.SOKOBAN) {
          this.sokobanCol = col;
          this.sokobanRow = row;
        }
      }
    }
  }

  getGroundMesh () {
    const { MATERIALS_MAP, TILES, side } = this;
    const geometry = new THREE.PlaneGeometry(side, side);
    const mesh = new THREE.Mesh(geometry, MATERIALS_MAP[TILES.EMPTY]);

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -side / 2;

    return mesh;
  }

  getSokobanMesh () {
    const { MATERIALS_MAP, TILES, side } = this;
    const sphere = new THREE.SphereGeometry(side / 2, 18, 18);
    const sokoban = new THREE.Mesh(sphere, MATERIALS_MAP[TILES.SOKOBAN]);
    const sokobanGroup = new THREE.Group();

    sokobanGroup.add(sokoban);
    sokobanGroup.add(this.getGroundMesh());

    return sokobanGroup;
  }

  getBoxMesh () {
    const { MATERIALS_MAP, TILES, side } = this;
    const boxSide = side * .75;
    const boxGeo = new THREE.BoxGeometry(boxSide, boxSide, boxSide);
    const boxMesh = new THREE.Mesh(boxGeo, MATERIALS_MAP[TILES.BOX]);
    const boxGroup = new THREE.Group();

    boxMesh.position.y = -side * 0.125;
    boxGroup.add(boxMesh);
    boxGroup.add(this.getGroundMesh());

    return boxGroup;
  }

  getExitMesh (code) {
    const { MATERIALS_MAP, side } = this;
    const arrowGeo = new THREE.PlaneGeometry(side, side);
    const arrowMesh = new THREE.Mesh(arrowGeo, MATERIALS_MAP[code]);
    const boxGroup = new THREE.Group();

    arrowMesh.rotation.x = -Math.PI / 2;
    arrowMesh.position.y = -side / 2;

    boxGroup.add(arrowMesh);
    boxGroup.add(this.getGroundMesh());

    return boxGroup;
  }

  getMesh ({ row, col }) {
    const { EXIT_TILE_LIST, MATERIALS_MAP, TILES, matrix, side } = this;
    const code = matrix[row][col];

    if (code === TILES.SOKOBAN) {
      return this.getSokobanMesh();
    } else if (code === TILES.BOX) {
      return this.getBoxMesh();
    } else if (code === TILES.EMPTY) {
      return this.getGroundMesh();
    } else if (EXIT_TILE_LIST.includes(code)) {
      return this.getExitMesh(code);
    }

    const geometry = new THREE.BoxGeometry(side, side, side);
    return new THREE.Mesh(geometry, MATERIALS_MAP[code]);
  }

  isOutsideOfMatrix({ row, col }) {
    const { matrix } = this;
    return row < 0 ||
      row > matrix.length - 1 ||
      col < 0 ||
      col > matrix[row].length - 1;
  }

  canMove ({ curRow, curCol, rowAdjust, colAdjust, isSokoban = true }) {
    const { BLOCK_TILE_LIST, TILES, matrix } = this;
    const row = curRow + rowAdjust;
    const col = curCol + colAdjust;
    const code = matrix[row][col];

    if (this.isOutsideOfMatrix({ row, col })) {
      return false; // outside of matrix
    } else if (BLOCK_TILE_LIST.includes(code)) {
      return false; // Cannot push Sokoban self, wall or unmovable box
    } else if (isSokoban && code === TILES.BOX) {
      // Only Sokoban can push the movable box
      const canPushBox = canMove({ curRow: row, curCol: col, rowAdjust, colAdjust, isSokoban: false });
      return canPushBox;
    }

    // Empty or one of Arrows
    return true;
  }

  canMoveSokoban ({ rowAdjust, colAdjust }) {
    const { sokobanRow, sokobanCol } = this;
    return this.canMove({
      curRow: sokobanRow,
      curCol: sokobanCol,
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
