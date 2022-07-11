import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

export default class BaseTexture {
  _context;
  _height;
  _width;
  _root;

  constructor ({ width, height } = {}) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.height = height || 256;
    this.width = width || 256;
  }

  get height () {
    return this._height;
  }

  set height (height) {
    this._height = height;
    this.canvas.setAttribute("height", this._height);
  }

  get width () {
    return this._width;
  }

  set width (width) {
    this._width = width;
    this.canvas.setAttribute("width", this._width);
  }

  get root () {
    return this._root;
  }

  set root (newRoot) {
    if (newRoot) {
      this._root = newRoot;
      this._root.appendChild(this.canvas);
    }
  }

  render () {
    // set in sub classes
  }

  toDataURL () {
    return this.canvas.toDataURL();
  }

  getImg () {
    const img = new Image();
    img.src = this.toDataURL();
    return img;
  }

  get3DObject ({ side = 1 } = {}) {
    const geometry = new THREE.BoxGeometry(side, side, side);
    const texture = new THREE.Texture(this.getImg());
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geometry, material);
  }
}
