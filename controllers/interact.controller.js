const staffIdeaService = require("../services/staffIdea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
const StaffIdeaModel = require("../database/models/StaffIdea");
const sendMail = require("../utilities/sendMail");
const Staff = require("../database/models/Staff");

const LikeIdea = async (req, res) => {
  try {
    if (!req.body.IdIdea || !req.body.idStaff || !req.body.isLike) {
      return res.status(404).send("Missing required information");
    }
    const check = await staffIdeaService.findOne({
      idStaff: req.body.idStaff,
      IdIdea: req.body.IdIdea,
    });
    if (!check) {
    }
    return res.status(200).send("Oke");
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:256 ~ updateStatus ~ err:", err);
    return err;
  }
};
const DisLikeIdea = async (req, res) => {
  try {
    return res.status(200).send("Oke");
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:256 ~ updateStatus ~ err:", err);
    return err;
  }
};
module.exports = {
  LikeIdea,
  DisLikeIdea,
};
