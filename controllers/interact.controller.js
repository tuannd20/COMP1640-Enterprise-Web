const staffIdeaService = require("../services/staffIdea.service");

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
      await staffIdeaService.createNew({
        idStaff: req.body.idStaff,
        IdIdea: req.body.IdIdea,
        isLike: true,
      });
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
