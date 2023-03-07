const RoleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const role = await RoleService.createRole(req.body);

    return res.json(role);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findRoleStaff = async (req, res) => {
  try {
    const role = await RoleService.findRoleStaff({});
    // console.log(role);

    return res.json(role);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRole,
  findRoleStaff,
};
