const CategoryService = require("../services/category.service");
const DepartmentService = require("../services/department.service");

const renderListCategoryPage = async (req, res, next) => {
  try {
    const staff = req.cookies.Staff;
    const departmentId = staff.idDepartment._id;
    const categories = await CategoryService.findCategoryByIdDepartment(
      departmentId,
    );

    const dataPayload = categories.toString();
    console.log("ass: ", dataPayload);

    let isHaveData = true;
    if (dataPayload === "") {
      isHaveData = false;
      console.log("dataPayload ", isHaveData);
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
    const formData = req.body;
    const name = req.body.nameCategory;
    // Validation logic
    if (!formData.nameCategory) {
      return res.send(
        "<script>alert('Category name is valided'); window.location.href='/qa/category/create';</script>",
      );
    }
    const checkCategoryResit = await CategoryService.findByName(name);
    if (!checkCategoryResit) {
      const category = await CategoryService.createCategory(formData);
      return res.redirect("/qa/categories");
    }
    return res.send(
      "<script>alert('Category name is existed'); window.location.href='/qa/category/create';</script>",
    );
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
  try {
    const categories = await CategoryService.updateCategory(
      { _id: id },
      { $set: updateObject },
    );
    return res.redirect("/qa/categories");
    // return res.json(categories);
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
