const CategoryRepository = require("../repositories/category.repository");

const createCategory = async (data) => {
  try {
    const result = await CategoryRepository.createCategory(data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllCategory = async () => {
  try {
    const result = await CategoryRepository.readCategories();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateCategory = async (id, data) => {
  try {
    const result = await CategoryRepository.updateCategory(id, data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllCategory = async () => {
  try {
    const result = await CategoryRepository.deleteAllCategory();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneCategory = async (id) => {
  try {
    const result = await CategoryRepository.deleteCategory(id);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readCategoryById = async (id) => {
  try {
    const result = await CategoryRepository.readCategoryById(id);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findByName = async (name) => {
  try {
    const result = await CategoryRepository.findByName(name);
    return result;
  } catch (err) {
    return err;
  }
};

const getAllCategoryByDepartment = async (id) => {
  try {
    const result = await CategoryRepository.getAllByDepartment(id);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: category.service.js:77 ~ getAllCategoryByDepartment ~ err:",
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
  getAllCategoryByDepartment,
};
