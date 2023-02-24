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

module.exports = {
  createTokenJwt,
};
