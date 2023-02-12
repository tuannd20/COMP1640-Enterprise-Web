const DepartmentService = require("../services/department.service");

const createDepartment = async (req, res) => {
  try {
    const department = await DepartmentService.createDepartment(req.body);

    return department;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllDepartment = async (req, res, next) => {
  try {
    const departments = await DepartmentService.getAllDepartment();
    return res.json("Department page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateDepartment = async (req, res) => {
  try {
    const departments = await DepartmentService.updateDepartment(
      req.params.id,
      req.body,
    );

    // eslint-disable-next-line no-undef
    return departments;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneDepartment = async (req, res) => {
  try {
    const departments = await DepartmentService.deleteOneDepartment(
      req.params.id,
    );

    // eslint-disable-next-line no-undef
    return departments;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllDepartment = async () => {
  try {
    const departments = await DepartmentService.deleteAllDepartment();

    // eslint-disable-next-line no-undef
    return departments;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteAllDepartment,
  deleteOneDepartment,
};
