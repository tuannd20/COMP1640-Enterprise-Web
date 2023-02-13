const CategoryRepository = require("../repositories/category.repository");

const createCategory = async (req, res) => {
  try {
    const result = await CategoryRepository.createCategory(req.body);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllCategory = async () => {
  try {
    const result = await CategoryRepository.getAllCategory();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await CategoryRepository.updateCategory(
      req.params.id,
      req.body,
    );
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
    const result = await CategoryRepository.deleteOneCategory(id);
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

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteAllCategory,
  deleteOneCategory,
  readCategoryById,
};
