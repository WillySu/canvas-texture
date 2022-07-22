import ArrowTexture from "../../modules/texture/ArrowTexture.js";
import BrickWallTexture from "../../modules/texture/BrickWallTexture.js";
import CeramicTileTexture from "../../modules/texture/CeramicTileTexture.js";
import SmileFaceTexture from "../../modules/texture/SmileFaceTexture.js";
import TriangleTexture from "../../modules/texture/TriangleTexture.js";
import WoodenBoxTexture from "../../modules/texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../../modules/texture/WoodenWallTexture.js";
import SimplePreview from "../../modules/threeJs/SimplePreview.js";
import { DIRECTIONS } from "../../modules/texture/SymboleTexture.js";

function init () {
  const width = 128;
  const height = 128;
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  const theadData = ["", "Canvas", "Image", "three.js"];
  const data = [
    {
      title: "Wooden Box",
      texture: new WoodenBoxTexture({ width, height })
    },
    {
      title: "Brick Wall",
      texture: new BrickWallTexture({ width, height })
    },
    {
      title: "Wooden Wall",
      texture: new WoodenWallTexture({ width, height })
    },
    {
      title: "Ceramic Tile",
      texture: new CeramicTileTexture({ width, height })
    },
    {
      title: "Smile Face",
      texture: new SmileFaceTexture({ width, height })
    },
    {
      title: "Up Arrow",
      texture: new ArrowTexture({ width, height, direction: DIRECTIONS.TOP })
    },
    {
      title: "Left Arrow",
      texture: new ArrowTexture({ width, height, direction: DIRECTIONS.LEFT })
    },
    {
      title: "Bottom Arrow",
      texture: new ArrowTexture({ width, height, direction: DIRECTIONS.BOTTOM })
    },
    {
      title: "Right Arrow",
      texture: new ArrowTexture({ width, height, direction: DIRECTIONS.RIGHT })
    },
    {
      title: "Up Triangle",
      texture: new TriangleTexture({ width, height, direction: DIRECTIONS.TOP })
    },
    {
      title: "Left Triangle",
      texture: new TriangleTexture({ width, height, direction: DIRECTIONS.LEFT })
    },
    {
      title: "Bottom Triangle",
      texture: new TriangleTexture({ width, height, direction: DIRECTIONS.BOTTOM })
    },
    {
      title: "Right Triangle",
      texture: new TriangleTexture({ width, height, direction: DIRECTIONS.RIGHT })
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
    const preview = new SimplePreview({ width, height });
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
