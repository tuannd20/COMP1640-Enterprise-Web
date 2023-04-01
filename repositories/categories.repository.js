const CategoryModel = require("../database/models/Category");

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find()
      .populate("idDepartment")
      .sort({ createdAt: -1 });

    return categories;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createCategory = async (data) => {
  try {
    const category = await CategoryModel.create(data);
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:8 ~ createCategory ~ err:",
      err,
    );
    return err;
  }
};

const readCategories = async (options) => {
  try {
    const category = await CategoryModel.find(options)
      .populate("idDepartment")
      .sort({ createdAt: -1 });
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:23 ~ readCategories ~ err:",
      err,
    );
    return err;
  }
};

const readCategoryById = async (id) => {
  try {
    const category = await CategoryModel.findById(id).populate("idDepartment");
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:36 ~ readCategoryById ~ err:",
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
    console.error(
      "🚀 ~ file: categories.repository.js:66 ~ updateStatusOfCategory ~ error:",
      error,
    );
    return error;
  }
};

const deleteCategory = async (id) => {
  try {
    const category = await CategoryModel.findOneAndRemove(id);
    return category;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:79 ~ deleteCategory ~ err:",
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
      "🚀 ~ file: categories.repository.js:92 ~ deleteAllCategory ~ err:",
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
    console.error(
      "🚀 ~ file: categories.repository.js:105 ~ findByName ~ err:",
      err,
    );
    return err;
  }
};

const getCategoryActivated = async () => {
  try {
    const result = await CategoryModel.find({ isUsed: true });
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:118 ~ getCategoryActivated ~ err:",
      err,
    );
    return err;
  }
};

const getCategoryByDepartmentId = async (id) => {
  try {
    const result = await CategoryModel.find({ idDepartment: id })
      .populate("idDepartment")
      .sort({ createdAt: -1 });
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:133 ~ getCategoryByDepartmentId ~ err:",
      err,
    );
    return err;
  }
};

const getCategoryByFilter = async (filter) => {
  try {
    const result = await CategoryModel.find(filter)
      .populate("idDepartment")
      .sort({ createdAt: -1 });
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: categories.repository.js:133 ~ getCategoryByDepartmentId ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  getAllCategories,
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
  getCategoryByFilter,
};
