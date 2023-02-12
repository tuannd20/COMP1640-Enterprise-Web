const DepartmentModel = require("../database/models/Department");

const createDepartment = async (data) => {
  try {
    const department = await DepartmentModel.create(data);

    return department;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllDepartment = async () => {
  try {
    const departments = await DepartmentModel.find();

    return departments;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const department = await DepartmentModel.findOneAndUpdate(id, data);
    console.log(department);
  } catch (err) {
    console.error(err);
  }
};

const deleteOneDepartment = async (id) => {
  try {
    const result = await DepartmentModel.findOneAndRemove(id);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteAllDepartment = async () => {
  try {
    const result = await DepartmentModel.deleteMany({});
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  deleteAllDepartment,
  deleteOneDepartment,
};
