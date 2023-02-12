const RoleModel = require("../database/models/Role");

const createRole = async (data) => {
  try {
    const role = await RoleModel.create(data);

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRole,
};
