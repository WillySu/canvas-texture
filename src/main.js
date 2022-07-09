import BrickWallTexture from "../modules/texture/BrickWallTexture.js";
import CeramicTileTexture from "../modules/texture/CeramicTileTexture.js";
import WoodenBoxTexture from "../modules/texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../modules/texture/WoodenWallTexture.js";

function init () {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  const theadData = ["", "Canvas", "Image"];
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
    const img = document.createElement("img");
    img.src = texture.canvas.toDataURL();
    imageTd.appendChild(img);

    tr.appendChild(th);
    tr.appendChild(canvasTd);
    tr.appendChild(imageTd);
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
}

window.addEventListener("DOMContentLoaded", init);
