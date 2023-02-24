const DepartmentService = require("../services/department.service");
const DepartmentModel = require("../database/models/Department");

const getCreateDepartment = async (req, res) => {
  res.render("partials/master", {
    title: "Create new Department",
    content: "../qam/department/createDepartmentpage",
    errorMessage: null,
    isFailed: false,
  });
};

const createDepartment = async (req, res) => {
  try {
    const formData = req.body;
    const { nameDepartment } = req.body;
    const { description } = req.body;
    // Validation logic
    const checkDepartmentResit = await DepartmentService.findByName(
      nameDepartment,
    );
    if (!checkDepartmentResit) {
      const department = await DepartmentService.createDepartment(formData);
      return res.redirect("/qam/department");
    }
    const errorDepartment = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new Department",
      content: "../qam/department/createDepartmentpage",
      errorMessage: errorDepartment,
      code: errorCode,
      isFailed: true,
      nameDepartment,
      description,
    });
  } catch (err) {
    return err;
  }
};

const getAllDepartment = async (req, res) => {
  try {
    const departments = await DepartmentService.getAllDepartment();

    // return res.render("qam/department/listDepartmentPage", {
    //   departments,
    // });
    return res.render("partials/master", {
      title: "Department List",
      content: "../qam/department/listDepartmentpage",
      Department: departments,
    });
  } catch (err) {
    return err;
  }
};

const getDepartmentActivated = async (req, res) => {
  try {
    const department = await DepartmentService.getDepartmentActivated({});
    return res.json(department);
  } catch (err) {
    return err;
  }
};

const getEditDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await DepartmentService.getDepartment({ _id: id });
    // return res.render("partials/master", {
    //   title: "Department Edit",
    //   content: "../qam/department/editDepartmentpage",
    //   Department: department,
    // });
    return res.render("partials/master", {
      title: "Department Edit",
      content: "../qam/department/editDepartmentpage",
      department,
      errorMessage: null,
      isFailed: false,
    });
  } catch (err) {
    return err;
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const updateObject = req.body;
  const { nameDepartment } = req.body;
  const { description } = req.body;
  try {
    // const checkDepartment = await DepartmentService.getDepartment({ _id: id });
    const checkDepartmentName = await DepartmentService.findByNameExist(
      id,
      nameDepartment,
    );

    if (checkDepartmentName.length === 0) {
      const departments = await DepartmentService.updateDepartment(
        { _id: id },
        { $set: updateObject },
      );
      return res.redirect("/qam/department");
    }

    const errorDepartment = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new Department",
      content: "../qam/department/createDepartmentpage",
      errorMessage: errorDepartment,
      code: errorCode,
      isFailed: true,
      nameDepartment,
      description,
    });
  } catch (err) {
    return err;
  }
};

const deleteOneDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const checkDepartment = await DepartmentService.getDepartment({
      _id: id,
    });
    if (checkDepartment.isUsed == false) {
      const departments = await DepartmentService.deleteOneDepartment({
        _id: id,
      });
      return res.redirect("/qam/department");
    }
    return res.redirect("/qam/department");
  } catch (err) {
    return err;
  }
};

const deleteAllDepartment = async (req, res) => {
  try {
    const departments = await DepartmentService.deleteAllDepartment();
    return res.json(departments);
  } catch (err) {
    return err;
  }
};

const updateDepartmentActivated = async (req, res) => {
  const { id } = req.params;
  try {
    const checkDepartment = await DepartmentService.getDepartment({ _id: id });
    if (checkDepartment.isUsed === false) {
      const departments = await DepartmentService.updateDepartment(
        { _id: id },
        { isUsed: true },
      );
    }

    return res.redirect("/qam/department");
  } catch (err) {
    return err;
  }
};

module.exports = {
  getCreateDepartment,
  createDepartment,
  getAllDepartment,
  getEditDepartment,
  updateDepartment,
  deleteAllDepartment,
  deleteOneDepartment,
  getDepartmentActivated,
  updateDepartmentActivated,
};
