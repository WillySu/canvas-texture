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

  getArrowMesh (code) {
    const { MATERIALS_MAP, side } = this;
    const arrowGeo = new THREE.PlaneGeometry(side, side);
    const arrowMesh = new THREE.Mesh(arrowGeo, MATERIALS_MAP[code]);

    arrowMesh.rotation.x = -Math.PI / 2;
    arrowMesh.position.y = -side / 2;

    return arrowMesh;
  }

  getExitMesh ({ row, col }) {
    const { EXIT_TILE_LIST, matrix } = this;
    const code = matrix[row][col];

    if (EXIT_TILE_LIST.includes(code)) {
      return this.getArrowMesh(code);
    }

    return undefined;
  }

  getItemMesh ({ row, col }) {
    const { EXIT_TILE_LIST, MATERIALS_MAP, TILES, matrix, side } = this;
    const code = matrix[row][col];

    if (code === TILES.SOKOBAN) {
      return this.getSokobanMesh();
    } else if (code === TILES.BOX) {
      return this.getBoxMesh();
    } else if (code === TILES.EMPTY || EXIT_TILE_LIST.includes(code)) {
      return this.getGroundMesh();
    }

    const geometry = new THREE.BoxGeometry(side, side, side);
    return new THREE.Mesh(geometry, MATERIALS_MAP[code]);
  }

  swapPositions (positions) {
    const [pos1, pos2] = positions;
    const { row: curRow, col: curCol } = pos1;
    const { row: newRow, col: newCol } = pos2;

    const code = this.matrix[newRow][newCol];
    this.matrix[newRow][newCol] = this.matrix[curRow][curCol];
    this.matrix[curRow][curCol] = code;

    const mesh = this.itemMeshMatrix[newRow][newCol];
    // Swap Three 3D Object positions x and z
    const { x, z } = mesh.position;
    this.itemMeshMatrix[newRow][newCol].position.x = this.itemMeshMatrix[curRow][curCol].position.x;
    this.itemMeshMatrix[newRow][newCol].position.z = this.itemMeshMatrix[curRow][curCol].position.z;
    this.itemMeshMatrix[curRow][curCol].position.x = x;
    this.itemMeshMatrix[curRow][curCol].position.z = z;

    // Swap Mesh position in itemMeshMatrix
    this.itemMeshMatrix[newRow][newCol] = this.itemMeshMatrix[curRow][curCol];
    this.itemMeshMatrix[curRow][curCol] = mesh;

    if (this.sokobanRow === curRow && this.sokobanCol === curCol) {
      this.sokobanRow = newRow;
      this.sokobanCol = newCol;
    }

    if (positions.length > 2) {
      const [pos, ...rest] = positions;
      this.swapPositions(rest);
    }
  }
}
