/* eslint-disable no-underscore-dangle */
const staffIdeaService = require("../services/staffIdea.service");
const IdeaService = require("../services/idea.service");

const LikeIdea = async (req, res) => {
  try {
    if (!req.body.IdIdea || !req.body.idStaff || !req.body.isLike) {
      return res.status(404).send("Missing required information");
    }
    const check = await staffIdeaService.findOne({
      idStaff: req.body.idStaff,
      IdIdea: req.body.IdIdea,
    });
    const findIdea = await IdeaService.getIdea(req.body.IdIdea);
    if (!findIdea) {
      return res.status(404).send("Idea you find is not exits");
    }
    if (!check || typeof check.isLike == "undefined") {
      const update = await staffIdeaService.createNew({
        idStaff: req.body.idStaff,
        IdIdea: req.body.IdIdea,
        isLike: true,
      });
      const newLikeCount = findIdea.likeCount + 1;
      const newDisLikeCount = findIdea.disLikeCount;

      const updateIdea = await IdeaService.updateIdea(req.body.IdIdea, {
        likeCount: newLikeCount,
      });
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res
        .status(200)
        .send({ newLikeCount, newDisLikeCount, isLike: true });
    }
    if (check.isLike == null) {
      const update = await staffIdeaService.updateIdea(check._id, {
        isLike: true,
      });
      const newLikeCount = findIdea.likeCount + 1;
      const newDisLikeCount = findIdea.disLikeCount;

      const updateIdea = await IdeaService.updateIdea(req.body.IdIdea, {
        likeCount: newLikeCount,
      });
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res
        .status(200)
        .send({ newLikeCount, newDisLikeCount, isLike: true });
    }
    if (check.isLike == true) {
      await staffIdeaService.updateIdea(check._id, {
        isLike: null,
      });
      const newLikeCount = findIdea.likeCount - 1;
      const newDisLikeCount = findIdea.disLikeCount;
      const updateIdea = await IdeaService.updateIdea(req.body.IdIdea, {
        likeCount: newLikeCount,
      });
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res
        .status(200)
        .send({ newLikeCount, newDisLikeCount, isLike: false });
    }
    await staffIdeaService.updateIdea(check._id, {
      isLike: true,
    });
    const newLikeCount = findIdea.likeCount + 1;
    const newDisLikeCount = findIdea.disLikeCount - 1;
    const updateIdea = await IdeaService.updateIdea(req.body.IdIdea, {
      likeCount: newLikeCount,
      disLikeCount: newDisLikeCount,
    });
    if (!updateIdea) {
      return res.status(500).send("Server error cannot update idea");
    }
    return res
      .status(200)
      .send({ newLikeCount, newDisLikeCount, isLike: true });
  } catch (err) {
    console.error(
      "🚀 ~ file: idea.controller.js:256 ~ updateStatus ~ err:",
      err,
    );
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
