const ManageQaService = require("../services/manageQA.service");
const DepartmentService = require("../services/department.service");

const renderCreateAccountPage = async (req, res) => {
  const departments = await DepartmentService.getAllDepartment();
  res.render("partials/master", {
    title: "Create new account",
    content: "../qam/qa/account/createAccountPage",
    departments,
  });
};

const renderEditAccountPage = async (req, res) => {
  const { id } = req.params;
  const staff = await ManageQaService.displayManageQaById({ _id: id });
  const departments = await DepartmentService.getAllDepartment();
  return res.render("partials/master", {
    title: "Edit account",
    content: "../qam/qa/account/editAccountPage",
    staff,
    departments,
  });
  // return res.json(staff);
};

const createStaff = async (req, res) => {
  try {
    const account = req.body;

    req.body.idRole = "63f066f996329eb058cc3095";

    const checkDepartment = await DepartmentService.getDepartment({
      _id: req.body.idDepartment,
    });

    if (checkDepartment.isUsed === false) {
      const departments = await DepartmentService.updateDepartment(
        { _id: req.body.idDepartment },
        { isUsed: true },
      );
    }

    const staff = await ManageQaService.createManageQa(account);

    return res.redirect("/qam/manage-qa");
  } catch (err) {
    console.log(err);
    res.json(err);
    return err;
  }
};

const displayStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await ManageQaService.displayManageQaById({ _id: id });

    return res.render("partials/master", {
      title: "Edit Account",
      content: "../qam/qa/account/editAccountPage",
      staff,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffs = await ManageQaService.getAllManageQa();

    // return res.json(staffs);
    return res.render("partials/master", {
      title: "List of accounts",
      content: "../qam/qa/account/listAccountPage",
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
    const staff = await ManageQaService.updateManageQa(
      { _id: id },
      { $set: req.body },
    );
    return res.redirect("/qam/manage-qa");
    // return res.json(staff);
  } catch (err) {
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
