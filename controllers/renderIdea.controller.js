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
const PollService = require("../services/poll.service");
const commentModel = require("../database/models/Comment");

const renderCreateIdeaPage = async (req, res) => {
  const staff = req.cookies.Staff;
  const account = await staffService.displayStaffById(staff._id);

  const newestPoll = await pollService.getPollNewest();

  const departments = await departmentService.getDepartmentActivated();

  return res.render("partials/master", {
    title: "Your Idea",
    content: "../staff/idea/createIdeaPage",
    staff,
    newestPoll,
    departments,
    account,
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

    const sort = req.query.Sort;
    const pollId = req.query.idPoll;
    const departmentId = req.query.idDepartment;
    const exception = req.query.Exception;
    const { page = 1 } = req.query;
    let querySort = {};
    const polls = await pollService.getPollActivated();

    const departments = await departmentService.getDepartmentActivated();

    let foundPoll;
    let foundDepartment;

    const anonymous = {
      fullName: "anonymous",
      avatarImage: null,
    };

    const query = { status: { $in: ["Private", "Public"] } };

    if (pollId) {
      query.idPoll = pollId;
      foundPoll = polls.find((poll) => poll._id.toString() === pollId);
    }

    if (departmentId) {
      query.idDepartment = departmentId;
      foundDepartment = departments.find(
        (department) => department._id.toString() === departmentId,
      );
    }

    if (sort === "Recently") {
      querySort = { createdAt: -1 };
    } else if (sort === "Like high to low") {
      querySort = { likeCount: -1 };
    } else if (sort === "Like low to high") {
      querySort = { likeCount: 1 };
    } else if (sort === "View high to low") {
      querySort = { viewCount: -1 };
    } else if (sort === "View low to high") {
      // eslint-disable-next-line no-unused-vars
      querySort = { viewCount: 1 };
    }

    let allIdea;
    let amountIdea;

    if (exception === "Anonymous") {
      query.status = ["Private"];
    }
    if (exception === "Without comment") {
      allIdea = await ideaService.getAllWithQuery(page, query);
      const ideasWithoutComment = [];

      // eslint-disable-next-line prefer-const, no-restricted-syntax
      for (let idea of allIdea) {
        // eslint-disable-next-line no-await-in-loop
        const comments = await commentModel.find({ idIdea: idea._id });
        if (comments.length === 0) {
          ideasWithoutComment.push(idea);
        }
      }
      amountIdea = await ideaService.getAllByQuery(query);

      allIdea = ideasWithoutComment;
    } else {
      // eslint-disable-next-line no-unused-vars
      amountIdea = await ideaService.getAllByQuery(query);
      allIdea = await ideaService.getAllWithQuery(page, query);
    }
    amountIdea = Math.ceil(Object.keys(amountIdea).length / 5);
    console.log(
      "🚀 ----------------------------------------------------------------------------------🚀",
    );
    console.log(
      "🚀 ~ file: renderIdea.controller.js:130 ~ displayAllIdea ~ amountIdea:",
      amountIdea,
    );
    console.log(
      "🚀 ----------------------------------------------------------------------------------🚀",
    );
    const data = {
      docs: allIdea,
      totalPage: amountIdea,
      page,
    };
    const allStaffIdea = await staffIdeaService.getAllWithQuery({
      idStaff: staff._id,
      isLike: { $in: [true, false] },
    });

    data.docs.forEach((element) => {
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
      data.docs.forEach((idea) => {
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

    const idStaffIdeas = all.map((obj) => obj.idStaffIdea);

    const uniqueIdStaffIdeas = new Set(idStaffIdeas);
    const participants = uniqueIdStaffIdeas.size;

    const percentage = `${((allIdea.totalDocs / all.totalDocs) * 100).toFixed(
      2,
    )}%`;
    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/homePage",
      staff,
      role: staff.idRole.nameRole,
      ideas: data,
      participants,
      percentage,
      polls,
      departments,
      exception,
      sort,
      foundPoll,
      foundDepartment,
    });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

// const displayAllIdea = async (req, res) => {
//   try {
//     const staff = req.cookies.Staff;
//     const sort = req.query.Sort;
//     const pollId = req.query.idPoll;
//     const departmentId = req.query.idDepartment;
//     const exception = req.query.Exception;

//     const anonymous = {
//       fullName: "anonymous",
//       avatarImage: null,
//     };

//     // eslint-disable-next-line prefer-const
//     let query = {
//       status: { $in: ["Private", "Public"] },
//     };

//     if (pollId) {
//       query.idPoll = pollId;
//     }

//     if (departmentId) {
//       query.idDepartment = departmentId;
//     }

//     if (exception === "Anonymous") {
//       query.status = ["Private"];
//     }

//     const { page = 1 } = req.query;
//     const limit = 5;
//     const options = {
//       page,
//       limit,
//       populate: { path: "idStaffIdea", model: Staff },
//       sort: { createdAt: -1 },
//     };

//     if (sort === "Recently") {
//       options.sort = { createdAt: -1 };
//     } else if (sort === "Like high to low") {
//       options.sort = { likeCount: -1 };
//     } else if (sort === "Like low to high") {
//       options.sort = { likeCount: 1 };
//     } else if (sort === "View high to low") {
//       options.sort = { viewCount: -1 };
//     } else if (sort === "View low to high") {
//       options.sort = { viewCount: 1 };
//     }

//     let allIdea;

//     if (exception === "Without comment") {
//       allIdea = await ideaService.getAllWithQuery(options, query);
//       // eslint-disable-next-line prefer-const
//       let ideasWithoutComment = [];

//       // eslint-disable-next-line prefer-const, no-restricted-syntax
//       for (let idea of allIdea.docs) {
//         // eslint-disable-next-line no-await-in-loop
//         const comments = await commentModel.find({ idIdea: idea._id });
//         if (comments.length === 0) {
//           ideasWithoutComment.push(idea);
//         }
//       }

//       allIdea.docs = ideasWithoutComment;
//       console.log(
//         "🚀 ~ file: idea.controller.js:266 ~ displayAllIdea ~ allIdea.docs:",
//         allIdea.docs,
//       );

//       if (!allIdea.docs) return res.redirect("/errors");
//     } else {
//       allIdea = await ideaService.getAllWithQuery(options, query);
//       if (!allIdea.docs) return res.redirect("/errors");
//     }

//     // if (!allIdea.docs) return res.redirect("/errors");

//     const allStaffIdea = await staffIdeaService.getAllWithQuery({
//       idStaff: staff._id,
//       isLike: { $in: [true, false] },
//     });

//     allIdea.docs.forEach((element, index) => {
//       if (
//         typeof element.urlFile === "undefined" ||
//         !isImageUrl(element.urlFile)
//       ) {
//         element.urlFile = null;
//       }
//       if (!element.idStaffIdea || element.status === "Private") {
//         element.idStaffIdea = anonymous;
//       }
//     });
//     if (allStaffIdea) {
//       allIdea.docs.forEach((idea) => {
//         const staffIdea = allStaffIdea.find(
//           (sIdea) => sIdea.IdIdea.toString() === idea._id.toString(),
//         );
//         if (staffIdea) {
//           idea.isLike = staffIdea.isLike;
//         } else {
//           idea.isLike = null;
//         }
//       });
//     }

//     const all = await ideaService.getAllWithQuery(
//       {},
//       {
//         status: { $in: ["Private", "Public"] },
//       },
//     );
//     // console.log(
//     //   "🚀 ~ file: idea.controller.js:235 ~ displayAllIdea ~ all:",
//     //   all,
//     // );

//     if (!all.docs) return res.redirect("/errors");
//     const idStaffIdeas = all.docs.map((obj) => obj.idStaffIdea);

//     const uniqueIdStaffIdeas = new Set(idStaffIdeas);
//     const participants = uniqueIdStaffIdeas.size;

//     const percentage = `${((allIdea.totalDocs / all.totalDocs) * 100).toFixed(
//       2,
//     )}%`;

//     const polls = await pollService.getPollActivated();

//     const departments = await departmentService.getDepartmentActivated();

//     // return res.json(allIdea.docs);
//     return res.render("partials/master", {
//       title: "Idea",
//       content: "../staff/homePage",
//       staff,
//       role: staff.idRole.nameRole,
//       ideas: data,
//       participants,
//       percentage,
//       polls,
//       departments,
//     });
//   } catch (err) {
//     return err;
//   }
// };

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

    return res.render("partials/master", {
      title: "Idea detail",
      content: "../staff/idea/detailIdea",
      data,
      staff,
      role,
    });
  } catch (err) {
    console.error(
      "🚀 ~ file: renderIdea.controller.js:204 ~ displayDetailIdea ~ err:",
      err,
    );
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
      populate: [
        { path: "idStaffIdea", select: "fullName avatarImage" },
        { path: "idPoll" },
      ],
      sort: { createdAt: -1 },
    };
    const query = { idStaffIdea: StaffData._id };
    const staffProfile = await staffService.displayStaffById(StaffData._id);
    const allStaffIdea = await staffIdeaService.getAllWithQuery({
      idStaff: StaffData._id,
      isLike: { $in: [true, false] },
    });
    const allIdea = await ideaService.getIdeaProfileWithQuery(options, query);
    console.log(
      "🚀 ~ file: renderIdea.controller.js:452 ~ getIdeaForStaff ~ allIdea:",
      allIdea,
    );

    const currentDate = new Date();

    await allIdea.docs.forEach(async (element) => {
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

      console.log("helololo: ", element.idPoll._id);
      const poll = await PollService.getPoll({ _id: element.idPoll._id });
      console.log(poll);

      if (poll.dateSubEnd.getTime() <= currentDate.getTime()) {
        const pollUpdateAction = await PollService.updateHandleActionIdea({
          _id: element.idPoll._id,
        });
        console.log("upadeac hua", pollUpdateAction);
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

    let isCreateNewIdea = true;
    const poll = await PollService.getPollNewest();

    if (
      (poll.dateStart.getTime() < currentDate.getTime() &&
        poll.dateEnd.getTime() <= currentDate.getTime()) ||
      currentDate.getTime() < poll.dateStart.getTime()
    ) {
      isCreateNewIdea = false;
    }

    return res.render("partials/master", {
      title: "Your profile",
      content: "../staff/profilePage",
      data,
      staff: staffPayload,
      role: staffPayload.idRole.nameRole,
      isHaveIdeas,
      staffProfile,
      isCreateNewIdea,
    });
  } catch (err) {
    console.error(
      "🚀 ~ file: renderIdea.controller.js:317 ~ getIdeaForStaff ~ err:",
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
