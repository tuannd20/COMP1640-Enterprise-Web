/* eslint-disable no-param-reassign */
const isImageUrl = require("is-image-url");
const mongoose = require("mongoose");
const departmentService = require("../services/department.service");
const pollService = require("../services/poll.service");
const ideaService = require("../services/idea.service");
const Staff = require("../database/models/Staff");
const staffService = require("../services/staff.service");
const staffIdeaService = require("../services/staffIdea.service");
const commentService = require("../services/comment.service");

const renderCreateIdeaPage = async (req, res) => {
  const staff = req.cookies.Staff;
  console.log(
    "🚀 ~ file: idea.controller.js:35 ~ renderCreateIdeaPage ~ staff:",
    staff,
  );
  const newestPoll = await pollService.getPollNewest();

  const departments = await departmentService.getDepartmentActivated();

  return res.render("partials/master", {
    title: "Your Idea",
    content: "../staff/idea/createIdeaPage",
    staff,
    newestPoll,
    departments,
    role: staff.idRole.nameRole,
  });
};

const renderEditIdeaPage = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = req.cookies.Staff;
    const departments = await departmentService.getAllDepartment();
    const idea = await ideaService.getIdea(id);
    console.log(idea.status);

    return res.render("partials/master", {
      title: "Your Idea",
      content: "../staff/idea/editIdeaPage",
      staff,
      idea,
      departments,
      role: staff.idRole.nameRole,
    });
  } catch (error) {
    return error;
  }
};

const displayAllIdea = async (req, res) => {
  try {
    const staff = req.cookies.Staff;

    const anonymous = {
      fullName: "anonymous",
      avatarImage: null,
    };

    const query = { status: { $in: ["Private", "Public"] } };
    const { page = 1 } = req.query;
    const limit = 5;
    const options = {
      page,
      limit,
      populate: { path: "idStaffIdea", model: Staff },
      sort: { createdAt: -1 },
    };

    const allIdea = await ideaService.getAllWithQuery(options, query);
    if (!allIdea.docs) return res.redirect("/errors");

    const allStaffIdea = await staffIdeaService.getAllWithQuery({
      idStaff: staff._id,
      isLike: { $in: [true, false] },
    });

    allIdea.docs.forEach((element) => {
      // eslint-disable-next-line valid-typeof
      if (element.urlFile != null) {
        for (let i = 0; i < element.urlFile.length; i += 1) {
          if (
            typeof element.urlFile[i] === "undefined" ||
            !isImageUrl(element.urlFile[i])
          ) {
            element.urlFile = null;
          }
        }
      }

      if (!element.idStaffIdea || element.status === "Private") {
        element.idStaffIdea = anonymous;
      }
    });

    if (allStaffIdea) {
      allIdea.docs.forEach((idea) => {
        const staffIdea = allStaffIdea.find(
          (sIdea) => sIdea.IdIdea.toString() === idea._id.toString(),
        );
        if (staffIdea) {
          idea.isLike = staffIdea.isLike;
        } else {
          idea.isLike = null;
        }
      });
    }

    const all = await ideaService.getAllWithQuery(
      {},
      {
        status: { $in: ["Private", "Public"] },
      },
    );
    console.log(
      "🚀 ~ file: idea.controller.js:235 ~ displayAllIdea ~ all:",
      all,
    );

    if (!all.docs) return res.redirect("/errors");
    const idStaffIdeas = all.docs.map((obj) => obj.idStaffIdea);

    const uniqueIdStaffIdeas = new Set(idStaffIdeas);
    const participants = uniqueIdStaffIdeas.size;

    const percentage = `${(
      (allIdea.totalDocs / allIdea.totalDocs) *
      100
    ).toFixed(2)}%`;

    // return res.json(allIdea.docs);
    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/homePage",
      staff,
      role: staff.idRole.nameRole,
      ideas: allIdea,
      participants,
      percentage,
    });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

const displayDetailIdea = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const role = staff.idRole.nameRole;
    const data = { ideas: "John", comments: [] };
    const anonymous = {
      fullName: "anonymous",
      avatarImage: null,
    };
    if (!req.params.id) return res.redirect("/errors");
    const idea = await ideaService.getIdea(req.params.id);
    const comment = await commentService.getAllCommentOfIdea(idea._id);
    if (!idea || !comment) return res.redirect("/errors");
    if (idea.idStaffIdea == null) return res.redirect("/errors");

    const allStaffIdea = await staffIdeaService.getAllWithQuery({
      idStaff: staff._id,
      isLike: { $in: [true, false] },
    });

    if (allStaffIdea) {
      const staffIdea = allStaffIdea.find(
        (sIdea) => sIdea.IdIdea.toString() === idea._id.toString(),
      );
      if (staffIdea) {
        idea.isLike = staffIdea.isLike;
      } else {
        idea.isLike = null;
      }
    }

    if (idea.status === "Private") {
      idea.idStaffIdea = anonymous;
    }

    if (idea.urlFile != null) {
      for (let i = 0; i < idea.urlFile.length; i += 1) {
        if (
          typeof idea.urlFile[i] === "undefined" ||
          !isImageUrl(idea.urlFile[i])
        ) {
          idea.urlFile = null;
        }
      }
    }

    data.ideas = idea;
    data.comments = comment;

    // return res.status(200).send(data);
    return res.render("partials/master", {
      title: "Idea detail",
      content: "../staff/idea/detailIdea",
      data,
      staff,
      role,
    });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:15 ~ createIdea ~ err", err);
    return err;
  }
};

const getIdeaForStaff = async (req, res) => {
  try {
    const staffPayload = req.cookies.Staff;
    const StaffData = req.cookies.Staff;
    if (!mongoose.Types.ObjectId.isValid(StaffData._id)) {
      return res.redirect("/Error");
    }
    const { page = 1 } = req.query;
    const limit = 5;
    const options = {
      page,
      limit,
      populate: { path: "idStaffIdea", select: "fullName avatarImage" },
      sort: { createdAt: -1 },
    };
    const query = { idStaffIdea: StaffData._id };
    const staffProfile = await staffService.displayStaffById(StaffData._id);
    const allStaffIdea = await staffIdeaService.getAllWithQuery({
      idStaff: StaffData._id,
      isLike: { $in: [true, false] },
    });
    const allIdea = await ideaService.getAllWithQuery(options, query);

    allIdea.docs.forEach((element) => {
      // eslint-disable-next-line valid-typeof
      if (element.urlFile != null) {
        for (let i = 0; i < element.urlFile.length; i += 1) {
          if (
            typeof element.urlFile[i] === "undefined" ||
            !isImageUrl(element.urlFile[i])
          ) {
            element.urlFile = null;
          }
        }
      }
    });

    if (allStaffIdea) {
      allIdea.docs.forEach((idea) => {
        const staffIdea = allStaffIdea.find(
          (sIdea) => sIdea.IdIdea.toString() === idea._id.toString(),
        );
        if (staffIdea) {
          idea.isLike = staffIdea.isLike;
        } else {
          idea.isLike = null;
        }
      });
    }

    allIdea.docs = allIdea.docs.filter((doc) => doc.idStaffIdea !== null);

    const data = { allIdea, staffPayload };

    let isHaveIdeas = true;
    if (data.allIdea.docs.toString() === "") {
      isHaveIdeas = false;
    }

    return res.render("partials/master", {
      title: "Your profile",
      content: "../staff/profilePage",
      data,
      staff: staffPayload,
      role: staffPayload.idRole.nameRole,
      isHaveIdeas,
      staffProfile,
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
module.exports = {
  renderCreateIdeaPage,
  renderEditIdeaPage,
  getIdeaForStaff,
  displayAllIdea,
  displayDetailIdea,
};
