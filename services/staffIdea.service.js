const StaffIdeaRepository = require("../repositories/staffIdea.repository");
const { createTokenJwt } = require("../utilities/jwt");

const findOne = async (data) => {
  try {
    const staff = await StaffIdeaRepository.findStaffIDea(data);

    return staff;
  } catch (err) {
    console.log("🚀 ~ file: staffIdea.service.js:10 ~ findOne ~ err:", err);
    return err;
  }
};

module.exports = {
  findOne,
};
