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
  const { id } = req.params;
  const staff = await StaffService.displayStaffById({ _id: id });
  const departments = await DepartmentService.getAllDepartment();
  const roles = await RoleService.getAllRole();
  return res.render("partials/master", {
    title: "Edit account",
    content: "../admin/account/editAccountPage",
    staff,
    departments,
    roles,
  });
  // return res.json(staff);
};

const renderProfilePage = async (req, res) => {
  res.render("partials/master", {
    title: "My profile",
    content: "../staff/profilePage",
  });
};

const createStaff = async (req, res) => {
  try {
    const emailAccount = req.body.email;
    const fullNameAccount = req.body.fullName;
    const addressAccount = req.body.address;
    const phoneAccount = req.body.phoneNumber;
    const checkEmail = await StaffService.findByEmail(emailAccount);
    const checkPhoneNumber = await StaffService.findByPhoneNumber(
      // eslint-disable-next-line no-use-before-define
      checkPhoneNumber,
    );
    if (!(checkEmail && checkPhoneNumber)) {
      const formData = req.body;
      const staff = await StaffService.createStaff(formData);
      return res.redirect("/admin/account");
    }

    const errorEmail = "Email is already exists";
    const errorCodeEmail = 400;
    const errorPhone = "Phone is already exists";
    const errorCodePhone = 401;

    return res.status(errorEmail, errorPhone).render("partials/master", {
      title: "Create new terms",
      content: "../admin/terms/createTermsPage",
      errorEmailMessage: errorEmail,
      errorPhoneMessage: errorPhone,
      codeEmail: errorCodeEmail,
      codePhone: errorCodePhone,
      isFailed: true,
      fullNameAccount,
      addressAccount,
      phoneAccount,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
    return err;
  }
};

const displayStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await StaffService.displayStaffById({ _id: id });

    return res.render("partials/master", {
      title: "Edit Account",
      content: "../admin/account/editAccountPage",
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
    const { id } = req.params;
    const updateObject = req.body;
    console.log(updateObject);
    const staff = await StaffService.updateStaff(
      { _id: id },
      { $set: req.body },
    );
    return res.redirect("/admin/account");
    // return res.json(staff);
  } catch (err) {
    return err;
  }
};

// const deleteOneStaff = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const staff = await StaffService.deleteOneStaff(id);
//     return res.redirect("/admin/account");
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllStaff = async (req, res) => {
//   try {
//     const staff = await StaffService.deleteAllStaff();

//     return res.json("Staff page");
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

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
  displayStaffById,
  getAllStaff,
  login,
  logout,
  renderProfilePage,
};
