const CategoryModel = require("../database/models/Category");

const createCategory = async (data) => {
  try {
    const category = await CategoryModel.create(data);
    return category;
  } catch (err) {
    return err;
  }
};

const readCategories = async (id) => {
  try {
    const category = await CategoryModel.find().populate("idDepartment");
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.repository.js:18 ~ readCategory ~ err",
      err,
    );
    return err;
  }
};

const readCategoryById = async (id) => {
  try {
    const category = await CategoryModel.findById(id);
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.repository.js:18 ~ readCategory ~ err",
      err,
    );
    return err;
  }
};

const updateCategory = async (id, data) => {
  try {
    const category = await CategoryModel.updateMany(id, data);
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.repository.js:18 ~ updateCategory ~ err",
      err,
    );
    return err;
  }
};

const deleteCategory = async (id) => {
  try {
    // if (CategoryModel.id === true) {
    //   const reasult = "Can not delete a category";
    //   console.log("you can't delete a category");
    //   return reasult;
    // }
    const category = await CategoryModel.findOneAndRemove(id);
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.repository.js:38 ~ deleteCategory ~ err",
      err,
    );
    return err;
  }
};

const deleteAllCategory = async () => {
  try {
    const category = await CategoryModel.deleteMany();
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.repository.js:38 ~ deleteCategory ~ err",
      err,
    );
    return err;
  }
};

module.exports = {
  readCategories,
  createCategory,
  readCategoryById,
  updateCategory,
  deleteCategory,
  deleteAllCategory,
};
