import ArrowTexture, { DIRECTIONS } from "../../modules/texture/ArrowTexture.js";
import BrickWallTexture from "../../modules/texture/BrickWallTexture.js";
import CeramicTileTexture from "../../modules/texture/CeramicTileTexture.js";
import SmileFaceTexture from "../../modules/texture/SmileFaceTexture.js";
import WoodenBoxTexture from "../../modules/texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../../modules/texture/WoodenWallTexture.js";
import SimplePreview from "../../modules/threeJs/SimplePreview.js";

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
    },
    {
      title: "UP Arrow",
      texture: new ArrowTexture({ direction: DIRECTIONS.TOP })
    },
    {
      title: "LEFT Arrow",
      texture: new ArrowTexture({ direction: DIRECTIONS.LEFT })
    },
    {
      title: "BOTTOM Arrow",
      texture: new ArrowTexture({ direction: DIRECTIONS.BOTTOM })
    },
    {
      title: "RIGHT Arrow",
      texture: new ArrowTexture({ direction: DIRECTIONS.RIGHT })
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
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(title));

    const canvasTd = document.createElement("td");
    texture.parent = canvasTd;

    const imageTd = document.createElement("td");
    imageTd.appendChild(texture.getImg());

    const threeJsTd = document.createElement("td");
    const preview = new SimplePreview();
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
