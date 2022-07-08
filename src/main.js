import BoxTexture from "../modules/texture/BoxTexture.js";
import WallTexture from "../modules/texture/WallTexture.js";

function init () {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const tbody = document.createElement("tbody");
  const tbodyTr = document.createElement("tr");
  const data = [
    {
      title: "Box Texture",
      canvas: new BoxTexture()
    },
    {
      title: "Wall Texture",
      canvas: new WallTexture()
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
