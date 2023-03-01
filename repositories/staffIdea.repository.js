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
const updateStaffIDea = async (id, data) => {
  try {
    const staff = await StaffIdeaModel.findByIdAndUpdate(id, data);
    return staff;
  } catch (err) {
    console.error(
      "🚀 ~ file: staffIdea.repository.js:32 ~ updateStaffIDea ~ err:",
      err,
    );
    return err;
  }
};

const findAllByOptions = async (options) => {
  try {
    const staff = await StaffIdeaModel.find(options);
    return staff;
  } catch (err) {
    console.error(
      "🚀 ~ file: staffIdea.repository.js:45 ~ findAllByOptions ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  findStaffIDea,
  createStaffIDea,
  updateStaffIDea,
  findAllByOptions,
};
