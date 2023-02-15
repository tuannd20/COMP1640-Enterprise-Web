const StaffService = require("../services/staff.service");
const DepartmentService = require("../services/department.service");
const RoleService = require("../services/role.service");

const index = async (req, res) => {
  res.render("login");
};

const renderCreateAccountPage = async (req, res) => {
  const departments = await DepartmentService.getAllDepartment();
  const roles = await RoleService.getAllRole();
  res.render("partials/master", {
    title: "Create new account",
    content: "../admin/account/createAccountPage",
    departments,
    roles,
  });
};

const renderEditAccountPage = async (req, res) => {
  const staff = await StaffService.displayStaffById(req.id);
  const departments = await DepartmentService.getAllDepartment();
  const roles = await RoleService.getAllRole();
  res.render("partials/master", {
    title: "Edit account",
    content: "../admin/account/editAccountPage",
    staff,
    departments,
    roles,
  });
};

const createStaff = async (req, res) => {
  try {
    const account = req.body;
    const staff = await StaffService.createStaff(account);

    // const findStaff = await StaffService.findStaff(req.params.email);
    // if (!findStaff) return res.status(400).send("Email has been used before");
    return res.redirect("/admin/account");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayStaffById = async (req, res) => {
  try {
    const staff = await StaffService.displayStaffById(req.body);

    return res.render("profile/profileStaff", {
      staff,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffs = await StaffService.getAllStaff();

    // return res.json(staffs);
    return res.render("partials/master", {
      title: "List of accounts",
      content: "../admin/account/listAccountPage",
      staffs,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (req, res) => {
  try {
    const staff = await StaffService.updateStaff(req.params.id, req.body);

    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneStaff = async (req, res) => {
  try {
    const staff = await StaffService.deleteOneStaff(req.params.id, req.body);

    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllStaff = async (req, res) => {
  try {
    const staff = await StaffService.deleteAllStaff();

    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findStaff = await StaffService.findStaff(email);

    if (!findStaff) return res.status(400).send("User does not exists");
    const pw = findStaff.password;
    if (pw != password) return res.status(400).send("Password is incorrect");

    // const checkPassword = sau ni ai làm phần này thì sẽ có hast pw = jwt nưa

    const token = await StaffService.createToken(email);
    res.cookie("token", token, { httpOnly: true });

    return res.render("homeStaff");
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.render("login");
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  index,
  renderCreateAccountPage,
  renderEditAccountPage,
  createStaff,
  updateStaff,
  deleteOneStaff,
  deleteAllStaff,
  displayStaffById,
  getAllStaff,
  login,
  logout,
};
