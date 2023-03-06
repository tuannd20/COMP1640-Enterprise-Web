const CategoryService = require("../services/category.service");
const DepartmentService = require("../services/department.service");

const renderListCategoryPage = async (req, res, next) => {
  try {
    const staff = req.cookies.Staff;
    const departmentId = staff.idDepartment._id;
    const categories = await CategoryService.findCategoryByIdDepartment(
      departmentId,
    );

    let isHaveData = true;
    if (categories.toString() === "") {
      isHaveData = false;
    }

    console.log(categories);

    return res.render("partials/master", {
      title: "Category",
      content: "../qa/category/listCategoryPage",
      categories,
      staff,
      isHaveData,
      role: staff.idRole.nameRole,
    });
    // return res.json(categories);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const rederCreateCategoryPage = async (req, res, next) => {
  try {
    const staff = req.cookies.Staff;
    const Departments = await DepartmentService.getAllDepartment();

    res.render("partials/master", {
      title: "Category",
      content: "../qa/category/createCategoryPage",
      Departments,
      staff,
      isFailed: false,
      role: staff.idRole.nameRole,
      idDepartment: staff.idDepartment._id,
      nameDepartment: staff.idDepartment.nameDepartment,
    });
  } catch (error) {
    console.log(error);
  }
};

// const createCategory = async (req, res, next) => {
//   try {
//     const formData = req.body;
//     const name = req.body.nameCategory;
//     // Validation logic
//     if (!formData.nameCategory) {
//       return res.redirect("/qa/category/create");
//     }
//     const category = await CategoryService.createCategory(formData);
//     return res.redirect("/qa/categories");
//   } catch (err) {
//     return err;
//   }
// };

const createCategory = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const formData = req.body;
    const name = req.body.nameCategory;

    const checkCategoryResit = await CategoryService.findByName(name);

    if (!checkCategoryResit) {
      const category = await CategoryService.createCategory(formData);
      console.log(category);
      return res.redirect("/qa/categories");
    }

    const errorCategory = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new Category",
      content: "../qa/category/createCategoryPage",
      errorMessage: errorCategory,
      code: errorCode,
      isFailed: true,
      staff,
      role: staff.idRole.nameRole,
      currentCategoryTitle: name,
      idDepartment: staff.idDepartment._id,
      nameDepartment: staff.idDepartment.nameDepartment,
    });
  } catch (err) {
    return err;
  }
};

const getEditCategory = async (req, res, next) => {
  const { id } = req.params;
  const staff = req.cookies.Staff;

  try {
    const category = await CategoryService.readCategoryById({ _id: id });
    const department = await DepartmentService.getAllDepartment();
    return res.render("partials/master", {
      title: "Category",
      content: "../qa/category/editCategoryPage",
      category,
      department,
      staff,
      isFailed: false,
      role: staff.idRole.nameRole,
      idDepartment: staff.idDepartment._id,
      nameDepartment: staff.idDepartment.nameDepartment,
    });
  } catch (err) {
    return err;
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  const staff = req.cookies.Staff;
  try {
    const checkCategoryResit = await CategoryService.findByName(
      updateObject.nameCategory,
    );
    console.log("dataaaa: ", checkCategoryResit);

    if (!checkCategoryResit) {
      const categories = await CategoryService.updateCategory(
        { _id: id },
        { $set: updateObject },
      );
      return res.redirect("/qa/categories");
    }
    // return res.json(categories);
    const errorCategory = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Edit Category",
      content: "../qa/category/editCategoryPage",
      errorMessage: errorCategory,
      code: errorCode,
      isFailed: true,
      staff,
      role: staff.idRole.nameRole,
      currentCategoryTitle: updateObject.nameCategory,
      idDepartment: staff.idDepartment._id,
      nameDepartment: staff.idDepartment.nameDepartment,
    });
  } catch (err) {
    return err;
  }
};

// const deleteOneCategory = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const checkCategory = await CategoryService.getCategory({
//       _id: id,
//     });

//     const checkDepartment = await DepartmentService.getDepartment({
//       _id: checkCategory.idDepartment,
//     });

//     if (checkCategory.isUsed == false && checkDepartment.isUsed == false) {
//       const category = await CategoryService.deleteOneCategory({
//         _id: id,
//       });
//       return res.json(category);
//     }

//     return res.send("This category is used");
//   } catch (err) {
//     return err;
//   }
// };

const deleteOneCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkCategoryActive = await CategoryService.readCategoryById({
      _id: id,
    });

    if (checkCategoryActive.isUsed === false) {
      const category = await CategoryService.deleteOneCategory({
        _id: id,
      });
      // return res.json(category);
      return res.redirect("/qa/categories");
    }
    return res.redirect("/qa/categories");
  } catch (err) {
    return err;
  }
};

const deleteAllCategory = async (req, res, next) => {
  try {
    const departments = await CategoryService.deleteAllCategory();
    return res.redirect("/qa/categories");
  } catch (err) {
    return err;
  }
};

const getCategoryActivated = async (req, res) => {
  try {
    const department = await DepartmentService.getCategoryActivated({});
    return res.json(department);
  } catch (err) {
    return err;
  }
};

const findCategoryByIdDepartment = async (req, res) => {
  try {
    const { idDepartment } = req.params;
    const categories = await CategoryService.findCategoryByIdDepartment(
      idDepartment,
    );

    // if (!categories) {
    //   return res.status(404).json({ status: "404 Not Found" });
    // }

    return res.json(categories);
  } catch (err) {
    return err;
  }
};

module.exports = {
  createCategory,
  getEditCategory,
  updateCategory,
  deleteAllCategory,
  deleteOneCategory,
  renderListCategoryPage,
  rederCreateCategoryPage,
  getCategoryActivated,
  findCategoryByIdDepartment,
};
