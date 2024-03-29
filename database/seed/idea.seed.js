const mongoose = require("mongoose");
const IdeaModel = require("../models/Idea");
const database = require("../connection");

const ideas = [
  // new IdeaModel({
  //   idStaffIdea: "6401f5afa4604c6d6ccdfae7",
  //   idPoll: "6401da2da4604c6d6ccdfac5",
  //   idDepartment: "6401f3e8a4604c6d6ccdfad6",
  //   idCategory: "64020d9db9f33b213f16e969",
  //   contentIdea: "test idea 1",
  //   urlFile: "url image image file",
  //   timeUpload: Date.now(),
  //   likeCount: 8,
  //   disLikeCount: 2,
  //   viewCount: 10,
  //   status: "Public",
  // }),
  // new IdeaModel({
  //   idStaffIdea: "63f071cbb3d20cf76f8c153e",
  //   idPoll: "63f06f1a73af73fb75984dd6",
  //   idDepartment: "63f069d3ebc00d7c6f011edd",
  //   idCategory: "63f06bfda21296c767a69caa",
  //   contentIdea: "Nhanh PO will invite all members go to eat chicken ++",
  //   urlFile: "url image image file",
  //   timeUpload: Date.now(),
  //   likeCount: 8,
  //   disLikeCount: 2,
  //   viewCount: 10,
  //   status: "Public",
  // }),
  // new IdeaModel({
  //   idStaffIdea: "63f071cbb3d20cf76f8c153e",
  //   idPoll: "63f06f1a73af73fb75984dd6",
  //   idDepartment: "63f069d3ebc00d7c6f011edd",
  //   idCategory: "63f06bfda21296c767a69caa",
  //   contentIdea: "Nhanh PO will invite all members go to eat chicken ++",
  //   urlFile: "url image image file",
  //   timeUpload: Date.now(),
  //   likeCount: 8,
  //   disLikeCount: 2,
  //   viewCount: 10,
  //   status: "Public",
  // }),
  new IdeaModel({
    idStaffIdea: "6401f521a4604c6d6ccdfade",
    idPoll: "63f06f1a73af73fb75984dd7",
    idDepartment: "63f069d3ebc00d7c6f011edd",
    idCategory: "63f06bfda21296c767a69cac",
    contentIdea: "Nhanh PO will invite all members go to eat chicken ++",
    urlFile: "url image image file",
    timeUpload: Date.now(),
    likeCount: 8,
    disLikeCount: 2,
    viewCount: 10,
    status: "Public",
  }),
];

(async () => {
  await database.connectionDatabase();
})();

ideas.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === ideas.length) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
