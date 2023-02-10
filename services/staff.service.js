const StaffRepository = require("../repositories/staff.repository");

const createStaff = async (data) => {
  try {
    const staff = await StaffRepository.createStaff(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (_id, body) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const updateObject = body;
    const staff = await StaffRepository.updateMany(
      { _id: id },
      { $set: updateObject },
    );
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteOneStaff = async (_id) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const staff = await StaffRepository.findByIdAndRemove(id);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteAllStaff = async () => {
  try {
    const staff = await StaffRepository.deleteMany();
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = {
  createStaff,
  updateStaff,
  deleteOneStaff,
  deleteAllStaff,
};
