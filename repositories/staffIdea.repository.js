const StaffIdeaModel = require("../database/models/StaffIdea");

const findStaffIDea = async (options) => {
  try {
    const staff = await StaffIdeaModel.findOne(options);
    return staff;
  } catch (err) {
    console.error(
      "🚀 ~ file: staffIdea.repository.js:8 ~ findStaffIDea ~ err:",
      err,
    );
    return err;
  }
};
const createStaffIDea = async (data) => {
  try {
    const staff = await StaffIdeaModel.create(data);
    return staff;
  } catch (err) {
    console.error(
      "🚀 ~ file: staffIdea.repository.js:20 ~ createStaffIDea ~ err:",
      err,
    );
    return err;
  }
};
const updateStaffIDea = async (options, data) => {
  try {
    const staff = await StaffIdeaModel.findOneAndUpdate(options, data);
    return staff;
  } catch (err) {
    console.error(
      "🚀 ~ file: staffIdea.repository.js:32 ~ updateStaffIDea ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  findStaffIDea,
  createStaffIDea,
  updateStaffIDea,
};
