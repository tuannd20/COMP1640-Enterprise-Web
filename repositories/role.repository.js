const RoleModel = require("../database/models/Role");

const getAllRole = async () => {
  try {
    const role = await RoleModel.find();

    return role;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createRole = async (data) => {
  try {
    const role = await RoleModel.create(data);

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findRoleStaff = async () => {
  try {
    const role = await RoleModel.find({ _id: "63f069093057672cba67eb4b" });

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRole,
  getAllRole,
  findRoleStaff,
};
