/* eslint-disable func-names */
/* eslint-disable no-plusplus */
const dropMenu = document.getElementById("menu_icon");
const drop = document.getElementById("dropdown");
// const download = document.getElementById("download-button");
// const downloadModel = document.getElementById("download-model");
// const cancelBtn = document.getElementsByClassName("cancel");

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

// download.addEventListener("click", () => {
//   downloadModel.style.display = "flex";
// });

// download.onclick = () => {
//   downloadModel.style.display = "flex";
// };

// cancelBtn.addEventListener("click", () => {
//   downloadModel.style.display = "none"; // Hide modal
// });

// cancelBtn.onclick = () => {
//   downloadModel.style.display = "none";
// };

// for (let i = 0; i < cancelBtn.length; i++) {
//   cancelBtn[i].onclick = () => {
//     downloadModel.style.display = "none";
//   };
// }

// window.onclick = function (event) {
//   if (event.target == downloadModel) {
//     downloadModel.style.display = "none"; // Hide modal
//   }
// };
