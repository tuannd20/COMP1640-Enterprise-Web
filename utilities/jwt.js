const jwt = require("jsonwebtoken");

const createTokenjwt = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  createTokenjwt,
};
