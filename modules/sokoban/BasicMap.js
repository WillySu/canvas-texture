import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";

export default class BasicMap {
  constructor ({ side = 18, numOfRow = 9, numOfCol = 9 } = {}) {
    this._side = side;
    this._numOfCol = numOfCol;
    this._numOfRow = numOfRow;
    this.map = new THREE.Group();
    this.exitMeshMatrix = (new Array(this.numOfRow)).fill(undefined).map(() => (new Array(this.numOfCol).fill(undefined)));
    this.itemMeshMatrix = (new Array(this.numOfRow)).fill(undefined).map(() => (new Array(this.numOfCol).fill(undefined)));
  }

  get numOfCol () {
    return this._numOfCol;
  }

  get numOfRow () {
    return this._numOfRow;
  }

  get side () {
    return this._side;
  }

  getExitMesh () {
    const { side } = this;
    const geometry = new THREE.PlaneGeometry(side, side);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }

  getItemMesh () {
    return undefined;
  }

  render () {
    const { numOfRow, numOfCol, side } = this;
    for (let row = 0; row < numOfRow; row++) {
      for (let col = 0; col < numOfCol; col++) {
        const exitMesh = this.getExitMesh({ row, col });
        const itemMesh = this.getItemMesh({ row, col });
        if (exitMesh) {
          exitMesh.position.x = col * side;
          exitMesh.position.z = row * side;
          this.map.add(exitMesh);
        }
        if (itemMesh) {
          itemMesh.position.x = col * side;
          itemMesh.position.z = row * side;
          this.map.add(itemMesh);
        }

        this.exitMeshMatrix[row][col] = exitMesh;
        this.itemMeshMatrix[row][col] = itemMesh;
      }
    }

    this.map.position.x = -numOfCol * side / 2 + side / 2;
    this.map.position.z = -numOfRow * side / 2 + side / 2;
  }
}
