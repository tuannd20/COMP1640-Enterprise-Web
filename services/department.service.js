const DepartmentRepository = require("../repositories/department.repository");

const createDepartment = async (data) => {
  try {
    const result = await DepartmentRepository.createDepartment(data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllDepartment = async () => {
  try {
    const result = await DepartmentRepository.getAllDepartment();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const result = await DepartmentRepository.updateDepartment(id, data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllDepartment = async () => {
  try {
    const result = await DepartmentRepository.deleteAllDepartment();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneDepartment = async (id) => {
  try {
    const result = await DepartmentRepository.deleteOneDepartment(id);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getDepartment = async (id) => {
  try {
    const result = await DepartmentRepository.getDepartment(id);
    return result;
  } catch (err) {
    return err;
  }
};

const getDepartmentActivated = async () => {
  try {
    const result = await DepartmentRepository.getDepartmentActivated();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteAllDepartment,
  deleteOneDepartment,
  getDepartment,
  getDepartmentActivated,
};
