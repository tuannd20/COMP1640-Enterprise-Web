/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
const dropMenu = document.getElementById("menu_icon");
const drop = document.getElementById("dropdown");
const download = document.getElementById("download-button");
const downloadModel = document.getElementById("modal");
const no = document.getElementById("no");
const yes = document.getElementById("yes");
const like = document.getElementsByClassName("like-icon");
const dislike = document.getElementsByClassName("dislike-icon");

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

for (let i = 0; i < like.length; i++) {
  // eslint-disable-next-line no-loop-func
  like[i].addEventListener("click", () => {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/ideas/like",
      data: { IdIdea: $(".id-idea").val(), isLike: true },
    }).then((response) => {
      $(".like-moule").eq(i).empty();
      $(".like-moule")[i].append(response.newLikeCount);
    });

    if (dislike[i].classList.contains("text-sky-500")) {
      dislike[i].classList.remove("text-sky-500");
      dislike[i].classList.add("text-slate-700");
    }
    like[i].classList.toggle("text-sky-500");
    like[i].classList.toggle("text-slate-700");
  });
}

for (let i = 0; i < dislike.length; i++) {
  // eslint-disable-next-line no-loop-func
  dislike[i].addEventListener("click", () => {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/ideas/Dislike",
      data: { IdIdea: $(".id-idea").val(), isLike: false },
    }).then((response) => {
      $(".dislike-moule").eq(i).empty();
      $(".dislike-moule")[i].append(response.newDisLikeCount);
    });

    if (like[i].classList.contains("text-sky-500")) {
      like[i].classList.remove("text-sky-500");
      like[i].classList.add("text-slate-700");
    }
    dislike[i].classList.toggle("text-sky-500");
    dislike[i].classList.toggle("text-slate-700");
  });
}
