/* eslint-disable curly */
const bcrypt = require("bcrypt");
const StaffService = require("../services/staff.service");

const renderLoginPage = async (req, res) => {
  try {
    let staff = req.cookies.Staff;
    if (typeof staff === "undefined") {
      staff = "";
    }

    return res.render("partials/master", {
      title: "Login",
      content: "../Login/loginPage",
      staff,
      isFailed: false,
    });
  } catch (error) {
    return error;
  }
};

const login = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const { email, password } = req.body;
    const findStaff = await StaffService.findStaffByEmail(email);

    console.log("Staff", findStaff);

    // eslint-disable-next-line curly
    if (!findStaff) {
      return res.render("partials/master", {
        title: "Login",
        content: "../Login/loginPage",
        staff,
        isFailed: true,
        errorMessage: "The Account does not exist",
      });
    }

    if (findStaff.lockAccount === true) {
      return res.render("partials/master", {
        title: "Login",
        content: "../Login/loginPage",
        staff,
        isFailed: true,
        errorMessage: "The Account has been disabled",
      });
    }

    if (
      findStaff.idRole.nameRole === "Admin" ||
      findStaff.idRole.nameRole === "QAM"
    ) {
      const handleToken = await StaffService.createToken(findStaff);

      res.cookie("AccessToken", handleToken, {
        http: true,
        sameSite: "strict",
      });

      res.cookie("isLoggedIn", true, {
        http: true,
        sameSite: "strict",
      });

      res.cookie("Staff", findStaff, {
        httpOnly: true,
        sameSite: "strict",
      });

      return res.redirect("/");
    }

    const validPassword = await bcrypt.compare(password, findStaff.password);

    if (!validPassword) {
      return res.render("partials/master", {
        title: "Login",
        content: "../Login/loginPage",
        staff,
        isFailed: true,
        errorMessage: "The Email or Password invalid",
      });
    }

    if (findStaff && validPassword) {
      const handleToken = await StaffService.createToken(findStaff);

      res.cookie("AccessToken", handleToken, {
        http: true,
        sameSite: "strict",
      });

      res.cookie("isLoggedIn", true, {
        http: true,
        sameSite: "strict",
      });

      res.cookie("Staff", findStaff, {
        httpOnly: true,
        sameSite: "strict",
      });
    }

    return res.redirect("/");
  } catch (err) {
    return err;
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("AccessToken");
    res.clearCookie("Staff");
    res.clearCookie("isLoggedIn");
    return res.redirect("/auth/login");
  } catch (error) {
    return error;
  }
};

const updatePassword = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const findStaff = await StaffService.findStaffByEmail(staff.email);

    if (
      findStaff.idRole.nameRole === "Admin" &&
      findStaff.password !== oldPassword
    ) {
      const errorMessage = {
        success: false,
        message: "The old password is incorrect",
      };
      return res.status(400).json(errorMessage);
    }

    const validPassword = await bcrypt.compare(oldPassword, findStaff.password);

    if (!validPassword) {
      const errorMessage = {
        success: false,
        message: "The old password is incorrect",
      };
      return res.status(400).json(errorMessage);
    }

    if (confirmPassword !== newPassword) {
      const errorMessage = {
        success: false,
        message: "The confirm password is incorrect",
      };
      return res.status(400).json(errorMessage);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    const changePassword = await StaffService.handleUpdatePasswordOfAccount(
      staff._id,
      hashed,
    );
    console.log(changePassword);
    return res.status(200).json(changePassword);
  } catch (error) {
    return error;
  }
};

module.exports = {
  renderLoginPage,
  login,
  logout,
  updatePassword,
};
