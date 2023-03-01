/* eslint-disable no-underscore-dangle */
const staffIdeaService = require("../services/staffIdea.service");
const IdeaService = require("../services/idea.service");

const LikeIdea = async (req, res) => {
  try {
    const myCookieData = req.cookies.Staff;
    const { IdIdea, isLike } = req.body;
    if (!IdIdea || !isLike) {
      return res.status(422).send("Missing required information");
    }
    const [check, findIdea] = await Promise.all([
      staffIdeaService.findOne({
        idStaff: myCookieData._id,
        IdIdea: req.body.IdIdea,
      }),
      IdeaService.getIdea(req.body.IdIdea),
    ]);
    console.log(
      "🚀 ~ file: interact.controller.js:13 ~ LikeIdea ~ findIdea:",
      findIdea,
    );

    console.log(
      "🚀 ~ file: interact.controller.js:19 ~ LikeIdea ~ check:",
      check,
    );
    if (!findIdea) {
      return res.status(404).send("Idea you find is not exits");
    }
    if (!check || typeof check.isLike === "undefined") {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.createNew({
          idStaff: myCookieData._id,
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
    const newLikeCount = findIdea.likeCount + 1;
    const newDisLikeCount = findIdea.disLikeCount - 1;

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
    const myCookieData = req.cookies.Staff;

    const { IdIdea, isLike } = req.body;
    if (!IdIdea || isLike === false) {
      return res.status(422).send("Missing required information");
    }
    const [check, findIdea] = await Promise.all([
      staffIdeaService.findOne({
        idStaff: myCookieData._id,
        IdIdea: req.body.IdIdea,
      }),
      IdeaService.getIdea(req.body.IdIdea),
    ]);
    console.log(
      "🚀 ~ file: interact.controller.js:113 ~ DisLikeIdea ~ findIdea:",
      findIdea,
    );

    console.log(
      "🚀 ~ file: interact.controller.js:120 ~ DisLikeIdea ~ check:",
      check,
    );
    if (!findIdea) {
      return res.status(404).send("Idea you find is not exits");
    }
    if (!check || typeof check.isLike === "undefined") {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.createNew({
          idStaff: myCookieData._id,
          IdIdea,
          isLike: false,
        }),
        IdeaService.updateIdea(IdIdea, {
          disLikeCount: findIdea.disLikeCount + 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount,
        newDisLikeCount: findIdea.disLikeCount + 1,
        isLike: true,
      });
    }
    if (check.isLike === null) {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.updateIdea(check._id, {
          isLike: false,
        }),
        IdeaService.updateIdea(IdIdea, {
          disLikeCount: findIdea.disLikeCount + 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount,
        newDisLikeCount: findIdea.disLikeCount + 1,
        isLike: true,
      });
    }
    if (check.isLike == true) {
      const [update, updateIdea] = await Promise.all([
        staffIdeaService.updateIdea(check._id, {
          isLike: false,
        }),
        await IdeaService.updateIdea(req.body.IdIdea, {
          likeCount: findIdea.likeCount - 1,
          disLikeCount: findIdea.disLikeCount + 1,
        }),
      ]);
      if (!updateIdea) {
        return res.status(500).send("Server error cannot update idea");
      }
      return res.status(200).send({
        newLikeCount: findIdea.likeCount - 1,
        newDisLikeCount: findIdea.disLikeCount + 1,
        isLike: true,
      });
    }
    const [update, updateIdea] = await Promise.all([
      staffIdeaService.updateIdea(check._id, {
        isLike: null,
      }),
      IdeaService.updateIdea(req.body.IdIdea, {
        disLikeCount: findIdea.disLikeCount - 1,
      }),
    ]);
    if (!updateIdea) {
      return res.status(500).send("Server error cannot update idea");
    }
    const newLikeCount = findIdea.likeCount;
    const newDisLikeCount = findIdea.disLikeCount - 1;

    return res
      .status(200)
      .send({ newLikeCount, newDisLikeCount, isLike: false });
  } catch (err) {
    console.error(
      "🚀 ~ file: interact.controller.js:194 ~ DisLikeIdea ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  LikeIdea,
  DisLikeIdea,
};
