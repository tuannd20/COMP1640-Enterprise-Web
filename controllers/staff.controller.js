const StaffService = require("../services/staff.service");

const index = async (req, res) => {
  res.render("home/login");
};

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

    return res.render("profile/profileStaff", {
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findStaff = await StaffService.findStaff(email);

    if (!findStaff) return res.status(400).send("User does not exists");
    const pw = findStaff.password;
    if (pw != password) return res.status(400).send("Password is incorrect");

    // const checkPassword = sau ni ai làm phần này thì sẽ có hast pw = jwt nưa

    const token = await StaffService.createToken(email);
    res.cookie("token", token, { httpOnly: true });

    return res.render("home/homeStaff");
  } catch (err) {
    console.log(err);
    return err;
  }
};

// eslint-disable-next-line consistent-return
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.render("home/login");
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  index,
  createStaff,
  updateStaff,
  deleteOneStaff,
  deleteAllStaff,
  displayStaffById,
  login,
  logout,
};
