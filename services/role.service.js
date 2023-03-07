const RoleRepository = require("../repositories/role.repository");

const getAllRole = async () => {
  try {
    const role = await RoleRepository.getAllRole();

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createRole = async (data) => {
  try {
    const role = await RoleRepository.createRole(data);

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findRoleStaff = async () => {
  try {
    const role = await RoleRepository.findRoleStaff();

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  findRoleStaff,
  createRole,
  getAllRole,
};
