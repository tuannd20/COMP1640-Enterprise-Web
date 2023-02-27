const StaffIdeaRepository = require("../repositories/staffIdea.repository");

const findOne = async (options) => {
  try {
    const staff = await StaffIdeaRepository.findStaffIDea(options);

    return staff;
  } catch (err) {
    console.error("🚀 ~ file: staffIdea.service.js:10 ~ findOne ~ err:", err);
    return err;
  }
};

const createNew = async (data) => {
  try {
    const staff = await StaffIdeaRepository.createStaffIDea(data);

    return staff;
  } catch (err) {
    console.error("🚀 ~ file: staffIdea.service.js:20 ~ createNew ~ err:", err);
    return err;
  }
};
const updateIdea = async (id, data) => {
  try {
    const staff = await StaffIdeaRepository.updateStaffIDea(id, data);

    return staff;
  } catch (err) {
    console.error("🚀 ~ file: staffIdea.service.js:30 ~ update ~ err:", err);
    return err;
  }
};

const findAllByOptions = async (options) => {
  try {
    const staff = await StaffIdeaRepository.findAllByOptions(options);

    return staff;
  } catch (err) {
    console.error("🚀 ~ file: staffIdea.service.js:10 ~ findOne ~ err:", err);
    return err;
  }
};
module.exports = {
  findOne,
  createNew,
  updateIdea,
  findAllByOptions,
};
