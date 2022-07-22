import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

import BaseTexture from "./BaseTexture.js";

export default class TransparentTexture extends BaseTexture {
  getMaterial () {
    return new THREE.MeshBasicMaterial({ map: this.getTexture(), transparent: true });
  }

  getGeometry ({ side } = {}) {
    return new THREE.PlaneGeometry(side, side);
  }
}
