// eslint-disable-next-line consistent-return
const isLoggedIn = async (req, res, next) => {
  try {
    const isLoggedInStatus = await req.cookies.isLoggedIn;
    console.log(isLoggedIn);
    next();

    if (!isLoggedInStatus) return res.redirect("/auth/login");
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthMiddleWare.js ~ line 19 ~ isLoggedIn ~ error",
      error,
    );
  }
};

// eslint-disable-next-line consistent-return
const isHaveToken = async (req, res, next) => {
  try {
    const token = await req.cookies.AccessToken;
    next();

    if (!token) return res.redirect("/errors");
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthMiddleWare.js ~ line 19 ~ isLoggedIn ~ error",
      error,
    );
  }
};

module.exports = { isLoggedIn, isHaveToken };
