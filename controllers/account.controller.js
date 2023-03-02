/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable array-callback-return */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-self-assign */
/* eslint-disable object-curly-newline */
const StaffService = require("../services/staff.service");
const DepartmentService = require("../services/department.service");
const RoleService = require("../services/role.service");
const { BAD_REQUEST } = require("../constants/http.status.code");

const index = async (req, res) => {
  res.render("home/login");
};

const renderCreateAccountPage = async (req, res) => {
  const staff = req.cookies.Staff;
  const departments = await DepartmentService.getAllDepartment();
  const roles = await RoleService.getAllRole();
  res.render("partials/master", {
    title: "Create new account",
    content: "../admin/account/createAccountPage",
    departments,
    roles,
    staff,
    errorMessageEmail: null,
    errorMessageSelect: null,
    errorMessagePhoneNumber: null,
    isSuccess: false,
    role: staff.idRole.nameRole,
  });
};

const renderEditAccountPage = async (req, res) => {
  const { id } = req.params;
  const staff = req.cookies.Staff;
  const staffByID = await StaffService.displayStaffById({ _id: id });
  const departments = await DepartmentService.getAllDepartment();
  const roles = await RoleService.getAllRole();
  return res.render("partials/master", {
    title: "Edit account",
    content: "../admin/account/editAccountPage",
    staffByID,
    staff,
    role: staff.idRole.nameRole,
    departments,
    roles,
    errorMessageEmail: null,
    errorMessageSelect: null,
    errorMessagePhoneNumber: null,
    isSuccess: false,
  });
  // return res.json(staff);
};

const renderProfilePage = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    return res.render("partials/master", {
      title: "Your profile",
      content: "../staff/profilePage",
      staff,
      role: staff.idRole.nameRole,
    });
  } catch (error) {
    return error;
  }
};

const createStaff = async (req, res) => {
  try {
    const staff = req.cookies.Staff;

    const formData = req.body;
    const { idDepartment } = req.body;
    const checkDepartment = await DepartmentService.getDepartment({
      _id: idDepartment,
    });
    if (checkDepartment.isUsed === false) {
      const departments = await DepartmentService.updateDepartment(
        { _id: idDepartment },
        { isUsed: true },
      );
      if (!departments) {
        res.redirect("/home/errors");
      }
    }
    const results = await StaffService.createStaff(formData);

    const departmentDB = results.data.departmentRenders.map((department) => ({
      _id: department._id,
      nameDepartment: department.name,
    }));

    const roleDB = results.data.roleRenders.map(
      (role) =>
        // eslint-disable-next-line no-param-reassign, dot-notation
        ({ _id: role._id, nameRole: role.name }),
      // eslint-disable-next-line function-paren-newline
    );

    if (results.statusCode === BAD_REQUEST) {
      return res.status(results.statusCode).render("partials/master", {
        title: "Create new account",
        content: "../admin/account/createAccountPage",
        departments: departmentDB,
        roles: roleDB,
        staff,
        email: results.data.staffRenders.email,
        fullName: results.data.staffRenders.fullName,
        phoneNumber: results.data.staffRenders.phoneNumber,
        address: results.data.staffRenders.address,
        errorMessageEmail: results.messageErrorEmail,
        errorMessageSelect: results.messageErrorSelect,
        errorMessagePhoneNumber: results.messageErrorPhone,
        isSuccess: results.successStatus,
        role: staff.idRole.nameRole,
      });
    }

    return res.redirect("/admin/account");
  } catch (err) {
    console.log(err);
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
      role: staff.idRole.nameRole,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const staffs = await StaffService.getAllStaff();

    // return res.json(staffs);
    return res.render("partials/master", {
      title: "List of accounts",
      content: "../admin/account/listAccountPage",
      staffs,
      staff,
      role: staff.idRole.nameRole,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const { idDepartment } = req.body;
    const checkDepartment = await DepartmentService.getDepartment({
      _id: idDepartment,
    });
    if (checkDepartment.isUsed === false) {
      const departments = await DepartmentService.updateDepartment(
        { _id: idDepartment },
        { isUsed: true },
      );
      if (!departments) {
        res.redirect("/home/errors");
      }
    }
    const { id } = req.params;
    // const updateObject = req.body;
    const results = await StaffService.updateStaff(
      { _id: id },
      { $set: req.body },
    );
    const departments = await DepartmentService.getAllDepartment();
    const roles = await RoleService.getAllRole();
    // const departmentDB = results.data.departmentRenders.map((department) => ({
    //   _id: department._id,
    //   nameDepartment: department.name,
    // }));

    // const roleDB = results.data.roleRenders.map(
    //   (role) =>
    //     // eslint-disable-next-line no-param-reassign, dot-notation
    //     ({ _id: role._id, nameRole: role.name }),
    //   // eslint-disable-next-line function-paren-newline
    // );

    if (results.statusCode === BAD_REQUEST) {
      return res.status(results.statusCode).render("partials/master", {
        title: "Edit an account",
        content: "../admin/account/editAccountPage",
        departments,
        roles,
        staff,
        // email: results.data.staffRenders.email,
        // fullName: results.data.staffRenders.fullName,
        // phoneNumber: results.data.staffRenders.phoneNumber,
        // address: results.data.staffRenders.address,
        errorMessageEmail: results.messageErrorEmail,
        errorMessageSelect: results.messageErrorSelect,
        errorMessagePhoneNumber: results.messageErrorPhone,
        isSuccess: results.successStatus,
      });
    }
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

const getStaffByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const findStaff = await StaffService.findStaffByEmail(email);
    console.log("Get Staff:", findStaff);

    return res.json(findStaff);
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

    return res.render("home/homeStaff");
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.render("home/login");
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
  getStaffByEmail,
  renderProfilePage,
};
