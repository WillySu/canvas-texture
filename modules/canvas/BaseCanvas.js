import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

export default class BaseCanvas {
  _context;
  _height;
  _width;
  _parent;
  _onClick;

  constructor ({
    width,
    height,
    onClick
  } = {}) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.height = height || 256;
    this.width = width || 256;
    this.onClick = onClick;
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

  get onClick () {
    return this._onClick;
  }

  set onClick (onClick) {
    if (this._onClick) {
      this.canvas.removeEventListener("click", this._onClick);
    }
    if (onClick) {
      this._onClick = onClick;
      this.canvas.addEventListener("click", this._onClick);
    }
  }

  render () {
    // set in sub classes
  }

  resize () {
    // set in sub classes
  }

  clear () {
    const { context, width, height } = this;
    context.clearRect(0, 0, width, height);
  }

  toDataURL () {
    return this.canvas.toDataURL();
  }

  getImg () {
    const { width, height } = this;
    const img = new Image();
    img.src = this.toDataURL();
    img.width = width;
    img.height = height;

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

  getGeometry ({ side } = {}) {
    return new THREE.BoxGeometry(side, side, side);
  }

  get3DObject ({ side = 1 } = {}) {
    const geometry = this.getGeometry({ side });
    return new THREE.Mesh(geometry, this.getMaterial());
  }
}
