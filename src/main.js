import BrickWallTexture from "../modules/texture/BrickWallTexture.js";
import CeramicTileTexture from "../modules/texture/CeramicTileTexture.js";
import SmileFaceTexture from "../modules/texture/SmileFaceTexture.js";
import WoodenBoxTexture from "../modules/texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../modules/texture/WoodenWallTexture.js";
import ThreePreview from "../modules/threeJs/ThreePreview.js";

function init () {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  const theadData = ["", "Canvas", "Image", "three.js"];
  const data = [
    {
      title: "Wooden Box",
      texture: new WoodenBoxTexture()
    },
    {
      title: "Brick Wall",
      texture: new BrickWallTexture()
    },
    {
      title: "Wooden Wall",
      texture: new WoodenWallTexture()
    },
    {
      title: "Ceramic Tile",
      texture: new CeramicTileTexture()
    },
    {
      title: "Smile Face",
      texture: new SmileFaceTexture()
    }
  ];

  theadData.forEach((d) => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(d));
    theadTr.appendChild(th);
  });
  thead.appendChild(theadTr);

  data.forEach((d) => {
    const { texture, title } = d;
    texture.render();

    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(title));

    const canvasTd = document.createElement("td");
    texture.root = canvasTd;

    const imageTd = document.createElement("td");
    imageTd.appendChild(texture.getImg());

    const threeJsTd = document.createElement("td");
    const preview = new ThreePreview();
    preview.add(texture.get3DObject({ side: 16 }));
    threeJsTd.appendChild(preview.renderer.domElement);

    tr.appendChild(th);
    tr.appendChild(canvasTd);
    tr.appendChild(imageTd);
    tr.appendChild(threeJsTd);
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
}

window.addEventListener("DOMContentLoaded", init);
