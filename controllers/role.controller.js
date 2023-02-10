const RoleService = require("../services/role.service");

const createRole = async (req, res) => {
  try {
    const role = await RoleService.createRole(req.body);

    return res.render("profileStaff");
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRole,
};
