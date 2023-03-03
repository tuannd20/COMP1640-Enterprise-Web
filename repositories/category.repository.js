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
    const category = await CategoryModel.find()
      .populate("idDepartment")
      .sort({ createdAt: -1 });
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

const updateStatusOfCategory = async (id) => {
  try {
    const statusCategory = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { $push: { isUsed: true } },
    );

    return statusCategory;
  } catch (error) {
    console.log(error);
    return error;
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

const findByName = async (name) => {
  try {
    const result = await CategoryModel.findOne({ nameCategory: name });
    return result;
  } catch (err) {
    return err;
  }
};

const getCategoryActivated = async () => {
  try {
    const result = await CategoryModel.find({ isUsed: true });
    return result;
  } catch (err) {
    return err;
  }
};

const getCategoryByDepartmentId = async (id) => {
  try {
    const result = await CategoryModel.find({ idDepartment: id }).populate(
      "idDepartment",
    );
    return result;
  } catch (err) {
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
  findByName,
  getCategoryActivated,
  getCategoryByDepartmentId,
  updateStatusOfCategory,
};
