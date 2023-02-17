/* eslint-disable func-names */
/* eslint-disable no-plusplus */
const dropMenu = document.getElementById("menu_icon");
const drop = document.getElementById("dropdown");
const download = document.getElementById("download-button");
const downloadModel = document.getElementById("modal");
const no = document.getElementById("no");
const yes = document.getElementById("yes");

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
  console.log("123");
  downloadModel.style.display = "flex";
});

no.addEventListener("click", () => {
  downloadModel.style.display = "none";
});
yes.addEventListener("click", () => {
  downloadModel.style.display = "none";
});
