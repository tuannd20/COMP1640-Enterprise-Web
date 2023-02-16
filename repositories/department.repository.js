const DepartmentModel = require("../database/models/Department");

const createDepartment = async (data) => {
  try {
    const department = await DepartmentModel.create(data);
    return department;
  } catch (err) {
    return err;
  }
};

const getAllDepartment = async () => {
  try {
    const departments = await DepartmentModel.find();

    return departments;
  } catch (err) {
    return err;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const department = await DepartmentModel.updateMany(id, data);
    return department;
  } catch (err) {
    return err;
  }
};

const deleteOneDepartment = async (id) => {
  try {
    const result = await DepartmentModel.findOneAndRemove(id);
    return result;
  } catch (err) {
    return err;
  }
};

const deleteAllDepartment = async () => {
  try {
    const result = await DepartmentModel.deleteMany({ isUsed: false });
    return result;
  } catch (err) {
    return err;
  }
};

const getDepartment = async (id) => {
  try {
    const result = await DepartmentModel.findById(id);

    return result;
  } catch (err) {
    return err;
  }
};

const findByName = async (name) => {
  try {
    const result = await DepartmentModel.findOne({ nameDepartment: name });
    return result;
  } catch (err) {
    return err;
  }
};

const getDepartmentActivated = async () => {
  try {
    const result = await DepartmentModel.find({ isUsed: true });
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
  findByName,
};
