import BrickWallTexture from "../modules/texture/BrickWallTexture.js";
import CeramicTileTexture from "../modules/texture/CeramicTileTexture.js";
import WoodenBoxTexture from "../modules/texture/WoodenBoxTexture.js";
import WoodenWallTexture from "../modules/texture/WoodenWallTexture.js";

function init () {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  const tbodyTr = document.createElement("tr");
  const data = [
    {
      title: "Wooden Box",
      canvas: new WoodenBoxTexture()
    },
    {
      title: "Brick Wall",
      canvas: new BrickWallTexture()
    },
    {
      title: "Wooden Wall",
      canvas: new WoodenWallTexture()
    },
    {
      title: "Ceramic Tile",
      canvas: new CeramicTileTexture()
    }
  ];

  data.forEach((d) => {
    const { title } = d;
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(title));
    theadTr.appendChild(th);
  });
  thead.appendChild(theadTr);

  data.forEach((d) => {
    const { canvas } = d;
    const td = document.createElement("td");
    canvas.root = td;
    canvas.render();
    tbodyTr.appendChild(td);
  });
  tbody.appendChild(tbodyTr);

  table.appendChild(thead);
  table.appendChild(tbody);
  document.body.appendChild(table);
}

window.addEventListener("DOMContentLoaded", init);
