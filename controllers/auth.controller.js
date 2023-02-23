const StaffService = require("../services/staff.service");

const renderLoginPage = async (req, res) => {
  try {
    return res.render("partials/master", {
      title: "Login",
      content: "../Login/loginPage",
    });
  } catch (error) {
    return error;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findStaff = await StaffService.findStaffByEmail(email);

    console.log("Staff", findStaff);

    if (!findStaff) return res.status(400).send("User does not exists");

    const passwordValid = findStaff.password;
    if (passwordValid != password) {
      return res.status(400).send("Password is incorrect");
    }

    if (findStaff && passwordValid) {
      // const staffDetail = {
      //   fullName: findStaff.fullName,
      //   email: findStaff.email,
      //   role: findStaff.idRole.nameRole,
      //   department: findStaff.idDepartment.nameDepartment,
      // };
      const handleToken = await StaffService.createToken(email);
      console.log("Create Token", handleToken);

      res.cookie("Access_Token: ", handleToken, {
        http: true,
        sameSite: "strict",
      });
    }

    return res.render("home/homeStaff");
  } catch (err) {
    return err;
  }
};

const logout = (req, res) => {
  try {
    return res.redirect("/auth/login");
  } catch (error) {
    return error;
  }
};

module.exports = {
  renderLoginPage,
  login,
  logout,
};
