import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import BasicMap from "./BasicMap.js";
import BrickWallTexture from "../texture/BrickWallTexture.js";
import CeramicTileTexture from "../texture/CeramicTileTexture.js";
import SmileFaceTexture from "../texture/SmileFaceTexture.js";
import WoodenBoxTexture from "../texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../texture/WoodenWallTexture.js";

const TILE_GROUND = 0;
const TILE_SOKOBAN = 1;
const TILE_MOVABLE_BOX = 2;
const TILE_UNMOVABLE_BOX = 3;
const TILE_WALL = 4;

const MATERIALS_MAP = {
  [TILE_GROUND]: (new CeramicTileTexture()).getMaterial(),
  [TILE_SOKOBAN]: (new SmileFaceTexture()).getMaterial(),
  [TILE_MOVABLE_BOX]: (new WoodenBoxTexture()).getMaterial(),
  [TILE_UNMOVABLE_BOX]: (new WoodenWallTexture()).getMaterial(),
  [TILE_WALL]: (new BrickWallTexture()).getMaterial()
};

const DEFAULT_MATRIX = [
  [4, 4, 4, 4, 4, 4],
  [4, 3, 0, 0, 3, 4],
  [4, 0, 1, 0, 0, 4],
  [4, 0, 0, 2, 0, 0],
  [4, 3, 0, 0, 3, 4],
  [4, 4, 4, 4, 4, 4]
];

export default class SokobanMap extends BasicMap {
  constructor ({ side = 18, matrix = DEFAULT_MATRIX } = {}) {
    super({
      side,
      numOfCol: matrix[0].length,
      numOfRow: matrix.length
    })

    this.matrix = matrix;
  }

  getGroundMesh() {
    const { side } = this;
    const geometry = new THREE.PlaneGeometry(side, side);
    const mesh = new THREE.Mesh(geometry, MATERIALS_MAP[TILE_GROUND]);

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -side / 2;

    return mesh;
  }

  getMesh ({ row, col }) {
    const { matrix, side } = this;
    const code = matrix[row][col];

    if (code === TILE_SOKOBAN) {
      const sphere = new THREE.SphereGeometry(side / 2);
      const sokoban = new THREE.Mesh(sphere, MATERIALS_MAP[code]);
      const ground = this.getGroundMesh();
      const group = new THREE.Group();

      group.add(sokoban);
      group.add(ground);

      return group;
    } else if (code === TILE_GROUND) {
      return this.getGroundMesh();
    }

    const geometry = new THREE.BoxGeometry(side, side, side);
    return new THREE.Mesh(geometry, MATERIALS_MAP[code]);
  }
}
