const DepartmentService = require("../services/department.service");

const getCreateDepartment = async (req, res, next) => {
  res.render("department/create");
};

const createDepartment = async (req, res, next) => {
  try {
    const department = await DepartmentService.createDepartment(req.body);
    return res.json(department);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllDepartment = async (req, res, next) => {
  try {
    const departments = await DepartmentService.getAllDepartment();
    // return res.render("department/index", departments);
    return res.json(departments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getEditDepartment = async (req, res, next) => {
  res.render("department/edit");
};

const updateDepartment = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  try {
    const departments = await DepartmentService.updateDepartment(
      { _id: id },
      { $set: updateObject },
    );

    return res.json(departments);
  } catch (err) {
    return err;
  }
};

const deleteOneDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const departments = await DepartmentService.deleteOneDepartment({
      _id: id,
    });
    return res.json(departments);
  } catch (err) {
    return err;
  }
};

const deleteAllDepartment = async (req, res, next) => {
  try {
    const departments = await DepartmentService.deleteAllDepartment();
    return res.json(departments);
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
};
