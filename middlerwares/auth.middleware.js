const { verifyToken } = require("../utilities/jwt");

// eslint-disable-next-line consistent-return
const isLoggedIn = async (req, res, next) => {
  try {
    const isLoggedInStatus = await req.cookies.isLoggedIn;
    console.log(isLoggedIn);
    if (!isLoggedInStatus) return res.redirect("/auth/login");
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthMiddleWare.js ~ line 19 ~ isLoggedIn ~ error",
      error,
    );
    return error;
  }
};

// eslint-disable-next-line consistent-return
const isHaveToken = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    if (!token) return res.redirect("/errors");
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthMiddleWare.js ~ line 19 ~ isLoggedIn ~ error",
      error,
    );
    return error;
  }
};

// eslint-disable-next-line consistent-return
const checkCurrentRoleAdmin = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    const getRoleToken = await verifyToken(token);
    console.log(getRoleToken);

    if (getRoleToken !== "Admin") return res.redirect("/errors");

    next();
  } catch (error) {
    return error;
  }
};
// eslint-disable-next-line consistent-return
const checkCurrentRoleQA = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    const getRoleToken = await verifyToken(token);

    if (getRoleToken !== "QA") return res.redirect("/errors");

    next();
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line consistent-return
const checkCurrentRoleQAM = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    const getRoleToken = await verifyToken(token);
    console.log(getRoleToken);

    if (getRoleToken !== "QAM") return res.redirect("/errors");

    next();
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line consistent-return
const checkCurrentRoleStaff = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    const getRoleToken = await verifyToken(token);
    console.log(getRoleToken);

    if (getRoleToken !== "Staff") return res.redirect("/errors");

    next();
  } catch (error) {
    return error;
  }
};

module.exports = {
  isLoggedIn,
  isHaveToken,
  checkCurrentRoleAdmin,
  checkCurrentRoleQA,
  checkCurrentRoleQAM,
  checkCurrentRoleStaff,
};
