const RoleRepository = require("../repositories/role.repository");

const createRole = async (data) => {
  try {
    const role = await RoleRepository.createRole(data);

    return role;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRole,
};
