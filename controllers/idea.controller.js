const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const Staff = require("../database/models/Staff");

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
    const data = { ideas: "John", comments: [] };

    if (!req.params.idIdea) return res.redirect("/404");
    const idea = await ideaService.getIdea(req.params.idIdea);
    if (!idea) return res.redirect("/404");
    // return res.status(200).send(Idea);
    // return res.render("partials/master", {
    //   title: "Idea",
    //   content: "../staff/idea/ideaDetailPage",
    // idea,
    // comments,
    // });
    data.ideas = idea;
    data.comments.push("cooking");

    return res.status(200).send(data);
    // return res.render("partials/master", {
    //   title: "Department Create",
    //   content: "../staff/idea/ideaDetailPage",
    //   idea,
    //   comments,
    // });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:15 ~ createIdea ~ err", err);
    return err;
  }
};

const displayAllIdea = async (req, res) => {
  try {
    const { page } = req.params;
    const limit = 5;
    const options = {
      page,
      limit,
      populate: { path: "idStaffIdea", model: Staff },
      sort: { createdAt: -1 },
    };

    const allIdea = await ideaService.getALl(options);
    if (!allIdea) return res.redirect("/404");

    allIdea.docs.forEach((element) => {
      if (typeof element.urlFile === "undefined") {
        // eslint-disable-next-line no-param-reassign
        element.urlFile = null;
      }
    });
    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/homePage",
      allIdea,
    });
    // return res.status(200).send(allIdea);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

const getIdeaForStaff = async (req, res) => {
  try {
    const { page, id } = req.params;
    const limit = 5;
    const options = {
      page,
      limit,
      query: { idStaffIdea: id },
      sort: { createdAt: -1 },
    };
    const staff = await staffService.displayStaffById(id);

    if (!staff) return res.redirect("/404");
    if (typeof staff.avatarImage === "undefined") {
      staff.avatarImage = null;
    }
    const allIdea = await ideaService.getALl(options);

    allIdea.docs.forEach((element) => {
      if (typeof element.urlFile === "undefined") {
        // eslint-disable-next-line no-param-reassign
        element.urlFile = null;
      }
    });
    const data = { allIdea, staff };
    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/profilePage",
      data,
    });
    // return res.status(200).send(data);
  } catch (err) {
    console.log(
      "🚀 ~ file: idea.controller.js:136 ~ displayAllIdea ~ err",
      err,
    );
    return err;
  }
};

const updateStatus = async (req, res) => {
  try {
    if (!req.body.idIdea || !req.body.idStaff || !req.body.action) {
      return res.status(404).send("Missing required information");
    }

    return res.status(200).send("newIdea");
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:15 ~ createIdea ~ err", err);
    return err;
  }
};
module.exports = {
  createIdea,
  displayDetailIdea,
  displayAllIdea,
  getIdeaForStaff,
  updateStatus,
};
