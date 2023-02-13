const CategoryService = require("../services/category.service");
const DepartmentService = require("../services/department.service");

const getCreateCategory = async (req, res, next) => {
  res.render("department/create");
};

const createCategory = async (req, res, next) => {
  try {
    const department = await CategoryService.createCategory(req.body);
    return res.json(department);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const departments = await CategoryService.getAllCategory();
    // return res.render("department/index", departments);
    return res.json(departments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getEditCategory = async (req, res, next) => {
  res.render("department/edit");
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  try {
    const departments = await CategoryService.updateCategory(
      { _id: id },
      { $set: updateObject },
    );

    return res.json(departments);
  } catch (err) {
    return err;
  }
};

const deleteOneCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkCategory = await CategoryService.getCategory({
      _id: id,
    });
    if (checkCategory.isUsed == false) {
      const checkDepartment = await DepartmentService.deleteOneCategory({
        _id: checkCategory.idDepartment,
      });
      if (checkDepartment.isUsed == false) {
        const category = await CategoryService.deleteOneCategory({
          _id: id,
        });
        return res.json(category);
      }
      return res.send("This department is used");
    }
    return res.send("This category is used");
  } catch (err) {
    return err;
  }
};

const deleteAllCategory = async (req, res, next) => {
  try {
    const departments = await CategoryService.deleteAllCategory();
    return res.json(departments);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getCreateCategory,
  createCategory,
  getAllCategory,
  getEditCategory,
  updateCategory,
  deleteAllCategory,
  deleteOneCategory,
};
