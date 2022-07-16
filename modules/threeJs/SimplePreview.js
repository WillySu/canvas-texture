import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

export default class SimplePreview {
  UNIT = 16;
  _height;
  _width;
  _parent;

  constructor ({ width, height } = {}) {
    this._height = height || 256;
    this._width = width || 256;
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(500));
    // this.scene.add(new THREE.HemisphereLight(0xffeeb1, 0x080820, .2));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2;

    this.resize();
    this.animate();
  }

  get height () {
    return this._height;
  }

  set height (height) {
    this._height = height;
    resize();
  }

  get width () {
    return this._width;
  }

  set width (width) {
    this._width = width;
    resize();
  }

  get parent () {
    return this._parent;
  }

  set parent (newParent) {
    this._parent = newParent;
    newParent.appendChild(this.renderer.domElement);
  }

  resize () {
    const {
      UNIT,
      camera,
      controls,
      renderer,
      scene,
      width,
      height
    } = this;

    camera.aspect = width / height;
    camera.position.set(UNIT, UNIT, UNIT * 2);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  
    controls.update();
  
    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }

  animate () {
    const { animate, camera, controls, renderer, scene } = this;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate.bind(this));
  }

  add (obj) {
    this.scene.add(obj);
  }
}
