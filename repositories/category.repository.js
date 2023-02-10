const CategoryModel = require("../database/models/Category");

const createCategory = async (data) => {
  try {
    const role = await CategoryModel.create(data);

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createCategory,
};
