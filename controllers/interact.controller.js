/* eslint-disable no-underscore-dangle */
const staffIdeaService = require("../services/staffIdea.service");
const IdeaService = require("../services/idea.service");

const LikeIdea = async (req, res) => {
  try {
    const { IdIdea, idStaff, isLike } = req.body;
    if (!IdIdea || !idStaff || !isLike) {
      return res.status(422).send("Missing required information");
    }
    const [check, findIdea] = await Promise.all([
      staffIdeaService.findOne({
        idStaff: req.body.idStaff,
        IdIdea: req.body.IdIdea,
      }),
      IdeaService.getIdea(req.body.IdIdea),
    ]);
    if (!findIdea) {
      return res.status(404).send("Idea you find is not exits");
    }
    if (!check || typeof check.isLike === "undefined") {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.createNew({
          idStaff,
          IdIdea,
          isLike: true,
        }),
        IdeaService.updateIdea(IdIdea, {
          likeCount: findIdea.likeCount + 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount + 1,
        newDisLikeCount: findIdea.disLikeCount,
        isLike: true,
      });
    }
    if (check.isLike === null) {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.updateIdea(check._id, {
          isLike: true,
        }),
        IdeaService.updateIdea(IdIdea, {
          likeCount: findIdea.likeCount + 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount + 1,
        newDisLikeCount: findIdea.disLikeCount,
        isLike: true,
      });
    }
    if (check.isLike == true) {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.updateIdea(check._id, {
          isLike: null,
        }),
        IdeaService.updateIdea(req.body.IdIdea, {
          likeCount: findIdea.likeCount - 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount - 1,
        newDisLikeCount: findIdea.disLikeCount,
        isLike: false,
      });
    }
    const [update, updateIdea] = await Promise.all([
      staffIdeaService.updateIdea(check._id, {
        isLike: true,
      }),
      IdeaService.updateIdea(req.body.IdIdea, {
        likeCount: findIdea.likeCount + 1,
        disLikeCount: findIdea.disLikeCount - 1,
      }),
    ]);
    if (!updateIdea) {
      return res.status(500).send("Server error cannot update idea");
    }
    const newLikeCount = update.likeCount + 1;
    const newDisLikeCount = update.disLikeCount - 1;

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
