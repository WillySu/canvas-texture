import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import Canvas from "../Canvas.js";
import { DEG_180, drawCircle, drawLines } from "./utils.js";

export default class SmileFaceTexture extends Canvas {
  constructor ({
    width,
    height,
    faceColor = "#FFF380",
    strokeFill = "black"
  } = {}) {
    super({ width, height });
    this.faceColor = faceColor;
    this.strokeFill = strokeFill;

    this.render();
  }

  render () {
    this.context.fillStyle = this.faceColor;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.lineWidth = 3;
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const oneQuarterH = this.height / 4;
    const xRadius = this.width / 32;
    const yRadius = this.height / 32;

    // left eye
    drawCircle({
      context: this.context,
      x: halfW * 0.8,
      y: oneQuarterH * 1.75,
      xRadius,
      yRadius,
      fillStyle: this.strokeFill
    });

    // right eye
    drawCircle({
      context: this.context,
      x: halfW * 1.2,
      y: oneQuarterH * 1.75,
      xRadius,
      yRadius,
      fillStyle: this.strokeFill
    });

    // Nose
    const noseW = this.width / 64;
    const noseH = this.height / 64;
    drawLines({
      context: this.context,
      points: [
        [halfW, halfH - noseH],
        [halfW + noseW, halfH + noseH],
        [halfW - noseW, halfH + noseH],
        [halfW, halfH - noseH]
      ],
      fillStyle: "black"
    });

    // Mouth
    drawCircle({
      context: this.context,
      x: halfW,
      y: this.height * 0.6,
      xRadius: this.width * 0.1,
      yRadius: this.height * 0.1,
      fillStyle: this.strokeFill,
      startAngle: DEG_180
    });
  }

  get3DObject ({ side = 1 } = {}) {
    const geometry = new THREE.SphereGeometry(side, 16, 16);
    const texture = new THREE.Texture(this.getImg());
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geometry, material);
  }
}
