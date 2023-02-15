const CategoryService = require("../services/category.service");
const DepartmentService = require("../services/department.service");

const renderListCategoryPage = async (req, res, next) => {
  try {
    res.render("partials/master", {
      title: "Category",
      content: "../qa/category/listCategoryPage",
    });
  } catch (error) {
    console.log(error);
  }
};

const rederCreateCategoryPage = async (req, res, next) => {
  try {
    const Departments = await DepartmentService.getAllDepartment();
    res.render("partials/master", {
      title: "Category",
      content: "../qa/category/createCategoryPage",
      Departments,
    });
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const categories = await CategoryService.createCategory();

    return res.render("partials/master", {
      title: "Category",
      content: "../qa/category/createCategoryPage",
      categories,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategory();

    return res.render("partials/master", {
      title: "Category",
      content: "../qa/category/listCategoryPage",
      categories,
    });
    // return res.json(categories);
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
    const categories = await CategoryService.updateCategory(
      { _id: id },
      { $set: updateObject },
    );
    return res.render("partials/master", {
      title: "Category",
      content: "../qa/category/editCategoryPage",
      categories,
    });
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

    const checkDepartment = await DepartmentService.getDepartment({
      _id: checkCategory.idDepartment,
    });

    if (checkCategory.isUsed == false && checkDepartment.isUsed == false) {
      const category = await CategoryService.deleteOneCategory({
        _id: id,
      });
      return res.json(category);
    }

    return res.send("This category is used");
  } catch (err) {
    return err;
  }
};

// const deleteOneCategory = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const category = await CategoryService.deleteOneCategory({
//       _id: id,
//     });
//     return res.json(category);
//   } catch (err) {
//     return err;
//   }
// };

const deleteAllCategory = async (req, res, next) => {
  try {
    const departments = await CategoryService.deleteAllCategory();
    return res.json(departments);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getEditCategory,
  updateCategory,
  deleteAllCategory,
  deleteOneCategory,
  renderListCategoryPage,
  rederCreateCategoryPage,
};
