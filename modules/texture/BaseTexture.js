import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

export default class BaseTexture {
  _context;
  _height;
  _width;
  _parent;

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

  get parent () {
    return this._parent;
  }

  set parent (newParent) {
    if (newParent) {
      this._parent = newParent;
      this._parent.appendChild(this.canvas);
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

  getTexture () {
    const texture = new THREE.Texture(this.getImg());
    texture.needsUpdate = true;

    return texture;
  }

  getMaterial () {
    return new THREE.MeshBasicMaterial({ map: this.getTexture() });
  }

  get3DObject ({ side = 1 } = {}) {
    const geometry = new THREE.BoxGeometry(side, side, side);
    return new THREE.Mesh(geometry, this.getMaterial());
  }
}
