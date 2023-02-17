const ideaService = require("../services/idea.service");

const createIdea = async (req, res) => {
  try {
    if (
      !req.body.idPoll ||
      !req.body.idDepartment ||
      !req.body.idCategory ||
      !req.body.contentIdea
    ) {
      return res.status(404).send("Missing required information");
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = ` ${day}/ ${month}/ ${year}`;

    let data = {
      idPoll: req.body.idPoll,
      idDepartment: req.body.idDepartment,
      idCategory: req.body.idCategory,
      contentIdea: req.body.contentIdea,
      timeUpload: time,
    };

    if (req.body.status) {
      const status = { status: req.body.status };
      data = Object.assign(data, status);
    }

    const newIdea = await ideaService.createIdea(data);
    if (!newIdea) {
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send(newIdea);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:15 ~ createIdea ~ err", err);
    return err;
  }
};

const displayDetailIdea = async (req, res) => {
  try {
    if (!req.params.idIdea) return res.redirect("/404");
    const Idea = await ideaService.getIdea(req.params.idIdea);
    if (!Idea) return res.redirect("/404");
    return res.status(200).send(Idea);
    // return res.render("partials/master", {
    //   title: "Idea",
    //   content: "../staff/idea/detailIdea",
    //   Department: Idea,
    // });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:15 ~ createIdea ~ err", err);
    return err;
  }
};

const displayAllIdea = async (req, res) => {
  try {
    const allIdea = await ideaService.getALl();
    if (!allIdea) return res.redirect("/404");
    return res.status(200).send(allIdea);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};
module.exports = {
  createIdea,
  displayDetailIdea,
  displayAllIdea,
};
