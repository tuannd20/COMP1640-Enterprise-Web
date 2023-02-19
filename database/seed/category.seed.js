const mongoose = require("mongoose");
const CategoryModel = require("../models/Category");
const database = require("../connection");

const category = [
  new CategoryModel({
    idDepartment: "63f069d3ebc00d7c6f011ede",
    nameCategory: "Level 02",
    isUsed: false,
  }),
  new CategoryModel({
    idDepartment: "63f069d3ebc00d7c6f011ede",
    nameCategory: "Level 03",
    isUsed: false,
  }),
  // new CategoryModel({
  //   idDepartment: "63f069d3ebc00d7c6f011edd",
  //   nameCategory: "Database Design",
  //   isUsed: false,
  // }),
  // new CategoryModel({
  //   idDepartment: "63f069d3ebc00d7c6f011edd",
  //   nameCategory: "Cloud Server",
  //   isUsed: false,
  // }),
];

(async () => {
  await database.connectionDatabase();
})();

category.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === category.length) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
