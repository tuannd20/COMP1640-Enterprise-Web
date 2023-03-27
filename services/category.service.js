const CategoryRepository = require("../repositories/categories.repository");

const createCategory = async (data) => {
  try {
    const result = await CategoryRepository.createCategory(data);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:8 ~ createCategory ~ err:",
      err,
    );
    return err;
  }
};

const getAllCategory = async (options) => {
  try {
    const result = await CategoryRepository.readCategories(options);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:21 ~ getAllCategory ~ err:",
      err,
    );
    return err;
  }
};

const updateCategory = async (id, data) => {
  try {
    const result = await CategoryRepository.updateCategory(id, data);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:34 ~ updateCategory ~ err:",
      err,
    );
    return err;
  }
};

const updateStatusCategory = async (id) => {
  try {
    const result = await CategoryRepository.updateStatusOfCategory(id);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:47 ~ updateStatusCategory ~ err:",
      err,
    );
    return err;
  }
};

const deleteAllCategory = async () => {
  try {
    const result = await CategoryRepository.deleteAllCategory();
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:60 ~ deleteAllCategory ~ err:",
      err,
    );
    return err;
  }
};

const deleteOneCategory = async (id) => {
  try {
    const result = await CategoryRepository.deleteCategory(id);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:73 ~ deleteOneCategory ~ err:",
      err,
    );
    return err;
  }
};

const readCategoryById = async (id) => {
  try {
    const result = await CategoryRepository.readCategoryById(id);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:86 ~ readCategoryById ~ err:",
      err,
    );
    return err;
  }
};

const findByName = async (name) => {
  try {
    const result = await CategoryRepository.findByName(name);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: category.service.js:99 ~ findByName ~ err:", err);
    return err;
  }
};

const findCategoryByIdDepartment = async (id) => {
  try {
    const result = await CategoryRepository.getCategoryByDepartmentId(id);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:109 ~ findCategoryByIdDepartment ~ err:",
      err,
    );
    return err;
  }
};

const getCategoryByFilter = async (filter) => {
  try {
    const result = await CategoryRepository.getCategoryByFilter(filter);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:122 ~ getCategoryByFilter ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteAllCategory,
  deleteOneCategory,
  readCategoryById,
  findByName,
  findCategoryByIdDepartment,
  updateStatusCategory,
  getCategoryByFilter,
};
