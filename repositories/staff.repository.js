const StaffModel = require("../database/models/Staff");

const createStaff = async (data) => {
  try {
    const staff = await StaffModel.create(data);

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
    // eslint-disable-next-line no-underscore-dangle, max-len
    const staff = await StaffModel.updateMany({ _id: id }, { $set: updateObject });
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
    const staff = await StaffModel.findByIdAndRemove(id);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteAllStaff = async () => {
  try {
    const staff = await StaffModel.deleteMany();
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
