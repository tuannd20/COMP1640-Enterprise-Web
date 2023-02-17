const StaffModel = require("../database/models/Staff");
const { createTokenjwt } = require("../utilities/jwt");

const createStaff = async (data) => {
  try {
    const staff = await StaffModel.create(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllStaff = async () => {
  try {
    const staffs = await StaffModel.find().populate(["idDepartment", "idRole"]);
    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findStaff = async (data) => {
  try {
    const staff = await StaffModel.findOne({ email: data });
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const displayAllStaff = async () => {
//   try {
//     const staff = await StaffModel.find();

//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const displayStaffById = async (id) => {
  try {
    const staff = await StaffModel.findById(id).populate([
      "idDepartment",
      "idRole",
    ]);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (id, data) => {
  try {
    // eslint-disable-next-line no-underscore-dangle, max-len
    const staff = await StaffModel.updateMany(id, data);
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
//     const staff = await StaffModel.findByIdAndRemove(id);
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllStaff = async () => {
//   try {
//     const staff = await StaffModel.deleteMany();
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// eslint-disable-next-line consistent-return
const createToken = async (data) => {
  try {
    const { email } = data;
    const payload = { email };
    const token = createTokenjwt(payload);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createStaff,
  updateStaff,
  displayStaffById,
  getAllStaff,
  findStaff,
  createToken,
};
