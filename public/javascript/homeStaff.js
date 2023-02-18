/* eslint-disable func-names */
/* eslint-disable no-plusplus */
const dropMenu = document.getElementById("menu_icon");
const drop = document.getElementById("dropdown");
const download = document.getElementById("download-button");
const downloadModel = document.getElementById("modal");
const no = document.getElementById("no");
const yes = document.getElementById("yes");
const like = document.getElementById("like-icon");
const dislike = document.getElementById("dislike-icon");

function dropdown() {
  drop.classList.toggle("hidden");
}

function dropdownDismiss() {
  drop.classList.add("hidden");
}

dropMenu.addEventListener("click", () => {
  dropdown();
});

drop.addEventListener("mouseleave", () => {
  dropdownDismiss();
});

download.addEventListener("click", () => {
  downloadModel.style.display = "flex";
});

no.addEventListener("click", () => {
  downloadModel.style.display = "none";
});
yes.addEventListener("click", () => {
  downloadModel.style.display = "none";
});

like.addEventListener("click", () => {
  if (dislike.classList.contains("text-sky-500")) {
    dislike.classList.remove("text-sky-500");
  }
  like.classList.toggle("text-sky-500");
});

dislike.addEventListener("click", () => {
  if (like.classList.contains("text-sky-500")) {
    like.classList.remove("text-sky-500");
  }
  dislike.classList.toggle("text-sky-500");
});
