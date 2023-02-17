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

const getAllStaff = async () => {
  try {
    const staffs = await StaffRepository.getAllStaff();

    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayStaffById = async (id) => {
  try {
    const staff = await StaffRepository.displayStaffById(id);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (id, data) => {
  try {
    const staff = await StaffRepository.updateStaff(id, data);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const deleteOneStaff = async (_id) => {
//   try {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = _id;
//     const staff = await StaffRepository.deleteOneStaff(id);
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllStaff = async () => {
//   try {
//     const staff = await StaffRepository.deleteAllStaff();
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const checkPassword = async (data) => {
  try {
    const staff = await StaffRepository.findStaff(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findStaff = async (data) => {
  try {
    const staff = await StaffRepository.findStaff(data);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const createToken = async (data) => {
  try {
    const token = await StaffRepository.createToken(data);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createStaff,
  updateStaff,
  getAllStaff,
  displayStaffById,
  findStaff,
  checkPassword,
  createToken,
};
