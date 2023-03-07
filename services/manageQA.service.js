const ManageQaRepository = require("../repositories/manageQA.repository");

const createManageQa = async (data) => {
  try {
    const staff = await ManageQaRepository.createManageQa(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllManageQa = async () => {
  try {
    const staffs = await ManageQaRepository.getAllManageQa();

    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayManageQaById = async (id) => {
  try {
    const staff = await ManageQaRepository.displayManageQaById(id);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateManageQa = async (id, data) => {
  try {
    const staff = await ManageQaRepository.updateManageQa(id, data);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const deleteOneManageQa = async (_id) => {
//   try {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = _id;
//     const staff = await ManageQaRepository.deleteOneManageQa(id);
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// const deleteAllManageQa = async () => {
//   try {
//     const staff = await ManageQaRepository.deleteAllManageQa();
//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const findManageQa = async (data) => {
  try {
    const staff = await ManageQaRepository.findManageQa(data);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createManageQa,
  updateManageQa,
  getAllManageQa,
  displayManageQaById,
  findManageQa,
};
