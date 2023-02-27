const jwt = require("jsonwebtoken");

const createTokenJwt = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const verifyToken = async (token) => {
  try {
    const verifyAccessToken = await jwt.verify(token, process.env.SECRET_KEY);

    console.log("JWWTTT: ", verifyAccessToken.role);
    return verifyAccessToken.role;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  createTokenJwt,
  verifyToken,
};
