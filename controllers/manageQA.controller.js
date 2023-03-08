const ManageQaService = require("../services/manageQA.service");
const DepartmentService = require("../services/department.service");
const { BAD_REQUEST } = require("../constants/http.status.code");
const RoleService = require("../services/role.service");
const StaffService = require("../services/staff.service");

const renderCreateAccountPage = async (req, res) => {
  const idDepartment = req.params.id;
  const staff = req.cookies.Staff;
  const department = await DepartmentService.getDepartment(idDepartment);
  res.render("partials/master", {
    title: "Create new account",
    content: "../qam/qa/account/createAccountPage",
    department,
    staff,
    errorMessageEmail: null,
    errorMessagePhoneNumber: null,
    isSuccess: false,
    role: staff.idRole.nameRole,
  });
};

const createStaff = async (req, res) => {
  try {
    // const account = req.body;
    const staff = req.cookies.Staff;

    req.body.idRole = "63f066f996329eb058cc3095";
    req.body.lockAccount = true;

    const formData = req.body;
    console.log("body controller", formData);
    const results = await StaffService.createStaff(formData);
    console.log(results);

    const checkDepartment = await DepartmentService.getDepartment({
      _id: req.body.idDepartment,
    });

    if (results.statusCode !== BAD_REQUEST && checkDepartment.isUsed === false) {
      const departments = await DepartmentService.updateDepartment(
        { _id: formData.idDepartment },
        { isUsed: true },
      );
    }
    // const staff = await ManageQaService.createManageQa(account);

    // return res.json(staff);
    if (results.statusCode === BAD_REQUEST) {
      return res.status(400).render("partials/master", {
        title: "Create new account",
        content: "../qam/qa/account/createAccountPage",
        staff,
        checkDepartment,
        email: results.data.staffRenders.email,
        fullName: results.data.staffRenders.fullName,
        phoneNumber: results.data.staffRenders.phoneNumber,
        address: results.data.staffRenders.address,
        errorMessageEmail: results.messageErrorEmail,
        errorMessagePhoneNumber: results.messageErrorPhone,
        isSuccess: results.successStatus,
        role: staff.idRole.nameRole,
      });
    }

    return res.redirect("/qam/departments");
  } catch (err) {
    console.log(err);
    res.json(err);
    return err;
  }
};

const renderEditAccountPage = async (req, res) => {
  const staff = req.cookies.Staff;
  const { id } = req.params;
  try {
    const qa = await ManageQaService.displayManageQaById({ _id: id });
    return res.render("partials/master", {
      title: "Edit account",
      content: "../qam/qa/account/editAccountPage",
      qa,
      staff,
      errorMessageEmail: null,
      errorMessagePhoneNumber: null,
      isSuccess: false,
      role: staff.idRole.nameRole,
    });
    // return res.json(staff);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const { id } = req.params;

    const staffByID = await StaffService.displayStaffById({ _id: id });

    // const updateObject = req.body;
    // console.log(updateObject);
    const results = await StaffService.updateStaff(id, req.body);

    if (results.statusCode === BAD_REQUEST) {
      return res.status(400).render("partials/master", {
        title: "Edit an account qa",
        content: "../qam/qa/account/editAccountPage",
        staff,
        staffByID,
        email: results.data.staffRenders.email,
        fullName: results.data.staffRenders.fullName,
        phoneNumber: results.data.staffRenders.phoneNumber,
        address: results.data.staffRenders.address,
        errorMessageEmail: results.messageErrorEmail,
        errorMessagePhoneNumber: results.messageErrorPhone,
        isSuccess: results.successStatus,
        role: staff.idRole.nameRole,
      });
    }

    return res.redirect("/qam/departments");
    // return res.json(staff);
  } catch (err) {
    return err;
  }
};

const displayStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = req.cookies.Staff;
    const result = await ManageQaService.displayManageQaById({ _id: id });

    return res.render("partials/master", {
      title: "Edit Account",
      content: "../qam/qa/account/editAccountPage",
      result,
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
    const staffs = await ManageQaService.getAllManageQa();

    // return res.json(staffs);
    return res.render("partials/master", {
      title: "List of accounts",
      content: "../qam/qa/account/listAccountPage",
      staffs,
      staff,
      role: staff.idRole.nameRole,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  renderCreateAccountPage,
  renderEditAccountPage,
  createStaff,
  updateStaff,
  displayStaffById,
  getAllStaff,
};
