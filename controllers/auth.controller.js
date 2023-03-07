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

const logout = async (req, res) => {
  try {
    await res.clearCookie("AccessToken");
    await res.clearCookie("Staff");
    await res.clearCookie("isLoggedIn");
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
