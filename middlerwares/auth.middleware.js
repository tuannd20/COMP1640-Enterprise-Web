// eslint-disable-next-line consistent-return
const isLoggedIn = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    console.log(token);
    next();
    if (!token) return res.json("Please......login");
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthMiddleWare.js ~ line 19 ~ isLoggedIn ~ error",
      error,
    );
  }
};

module.exports = { isLoggedIn };
