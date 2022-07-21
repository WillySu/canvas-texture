import ArrowTexture, { DIRECTIONS } from "../texture/ArrowTexture.js";
import BrickWallTexture from "../texture/BrickWallTexture.js";
import CeramicTileTexture from "../texture/CeramicTileTexture.js";
import SmileFaceTexture from "../texture/SmileFaceTexture.js";
import WoodenBoxTexture from "../texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../texture/WoodenWallTexture.js";

export const DEFAULT_TILES = {
  EMPTY: 0,
  SOKOBAN: 1,
  BOX: 2,
  OBSTICLE: 3,
  WALL: 4,
  ARROW_UP: 6,
  ARROW_RIGHT: 7,
  ARROW_BOTTOM: 8,
  ARROW_LEFT: 9
};

export const DEFAULT_EXIT_TILE_LIST = [
  DEFAULT_TILES.ARROW_UP,
  DEFAULT_TILES.ARROW_RIGHT,
  DEFAULT_TILES.ARROW_BOTTOM,
  DEFAULT_TILES.ARROW_LEFT
];

export const DEFAULT_BLOCK_TILE_LIST = [
  DEFAULT_TILES.SOKOBAN,
  DEFAULT_TILES.OBSTICLE,
  DEFAULT_TILES.WALL
];

export const DEFAULT_MATERIALS_MAP = {
  [DEFAULT_TILES.EMPTY]: (new CeramicTileTexture()).getMaterial(),
  [DEFAULT_TILES.SOKOBAN]: (new SmileFaceTexture()).getMaterial(),
  [DEFAULT_TILES.BOX]: (new WoodenBoxTexture()).getMaterial(),
  [DEFAULT_TILES.OBSTICLE]: (new WoodenWallTexture()).getMaterial(),
  [DEFAULT_TILES.WALL]: (new BrickWallTexture()).getMaterial(),
  [DEFAULT_TILES.ARROW_UP]: (new ArrowTexture({ direction: DIRECTIONS.TOP })).getMaterial(),
  [DEFAULT_TILES.ARROW_RIGHT]: (new ArrowTexture({ direction: DIRECTIONS.LEFT })).getMaterial(),
  [DEFAULT_TILES.ARROW_BOTTOM]: (new ArrowTexture({ direction: DIRECTIONS.BOTTOM })).getMaterial(),
  [DEFAULT_TILES.ARROW_LEFT]: (new ArrowTexture({ direction: DIRECTIONS.RIGHT })).getMaterial()
};

export const DEFAULT_MATRIX = [
  [4, 4, 4, 4, 4, 4],
  [4, 3, 0, 0, 3, 4],
  [4, 0, 1, 0, 0, 4],
  [4, 0, 0, 2, 0, 7],
  [4, 3, 0, 0, 3, 4],
  [4, 4, 4, 4, 4, 4]
];
