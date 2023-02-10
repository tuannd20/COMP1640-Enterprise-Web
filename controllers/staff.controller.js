const StaffService = require("../services/staff.service");

const createStaff = async (req, res) => {
  try {
    const staff = await StaffService.createStaff(req.body);

    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayStaffById = async (req, res) => {
  try {
    const staff = await StaffService.displayStaffById(req.body);

    return res.render("profileStaff", {
      staff,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateStaff = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = req.params._id;
    const updateObject = req.body;
    // eslint-disable-next-line max-len
    const staff = await StaffService.updateMany(
      { _id: id },
      { $set: updateObject },
    )
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Staff is updated",
          updateStaff: updateObject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneStaff = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = req.params._id;
    const staff = await StaffService.findByIdAndRemove(id)
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Staff is deleted successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
    return res.json("Staff page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllStaff = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const staff = await StaffService.deleteMany()
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Delete all staff successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
    return res.json("Staff page");
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
  displayStaffById,
};
