const StaffIdeaModel = require("../database/models/StaffIdea");

const findStaffIDea = async (options) => {
  console.log(
    "🚀 ~ file: staffIdea.repository.js:4 ~ findStaffIDea ~ options:",
    options,
  );
  try {
    const staff = await StaffIdeaModel.findOne(options);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = {
  findStaffIDea,
};
