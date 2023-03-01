const ManageQaModel = require("../database/models/Staff");
const RoleModel = require("../database/models/Role");

const createManageQa = async (data) => {
  try {
    const staff = await ManageQaModel.create(data);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllManageQa = async () => {
  try {
    // const roles = await ManageQaModel.find({ nameRole: "QA" });
    const id = "63f066f996329eb058cc3095";
    const staffs = await ManageQaModel.find({ idRole: id })
      .sort({ createdAt: -1 })
      .populate(["idDepartment", "idRole"]);
    return staffs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findManageQa = async (data) => {
  try {
    const staff = await ManageQaModel.findOne({ email: data });
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// const displayAllManageQa = async () => {
//   try {
//     const staff = await ManageQaModel.find();

//     return staff;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

const displayManageQaById = async (id) => {
  try {
    const staff = await ManageQaModel.findById(id).populate([
      "idDepartment",
      "idRole",
    ]);

    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateManageQa = async (id, data) => {
  try {
    // eslint-disable-next-line no-underscore-dangle, max-len
    const staff = await ManageQaModel.updateMany(id, data);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneManageQa = async (_id) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const staff = await ManageQaModel.findByIdAndRemove(id);
    return staff;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createManageQa,
  updateManageQa,
  displayManageQaById,
  getAllManageQa,
  findManageQa,
  deleteOneManageQa,
};
