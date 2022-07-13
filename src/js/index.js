function init () {
  const TEXTURE = "texture";
  const SOKOBAN = "sokoban";

  const textureLink = document.getElementById("textureLink");
  const sokobanLink = document.getElementById("sokobanLink");
  const iframe = document.getElementById("contentIFrame");
  if (localStorage.getItem("currentPage") === SOKOBAN) {
    sokobanLink.classList.add("active");
    iframe.src = sokobanLink.href;
  } else {
    textureLink.classList.add("active");
    iframe.src = textureLink.href;
  }

  textureLink.addEventListener("click", () => {
    localStorage.setItem("currentPage", TEXTURE);
    textureLink.classList.add("active");
    sokobanLink.classList.remove("active");
  });

  sokobanLink.addEventListener("click", () => {
    localStorage.setItem("currentPage", SOKOBAN);
    sokobanLink.classList.add("active");
    textureLink.classList.remove("active");
  });
}

window.addEventListener("DOMContentLoaded", init);
