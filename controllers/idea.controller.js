/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const multer = require("multer");
const isImageUrl = require("is-image-url");
const mongoose = require("mongoose");

const upload = multer({ dest: "public/uploads/" });

const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
const departmentService = require("../services/department.service");
const pollService = require("../services/poll.service");
const staffIdeaService = require("../services/staffIdea.service");
const commentService = require("../services/comment.service");
const StaffIdeaModel = require("../database/models/StaffIdea");
const sendMail = require("../utilities/sendMail");
const Staff = require("../database/models/Staff");
const ideaModel = require("../database/models/Idea");
const commentModel = require("../database/models/Comment");

// Set up the multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

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

const createIdea = async (req, res) => {
  try {
    const StaffData = req.cookies.Staff;
    const id = StaffData._id;
    let newFilePath;
    if (req.file) {
      const filePath = req.file.path;

      const fileName = req.file.originalname;
      newFilePath = `public/uploads/${fileName}`;
      fs.renameSync(filePath, newFilePath);
    }

    if (
      !req.body.pool ||
      !req.body.department ||
      !req.body.Category ||
      !req.body.content
    ) {
      return res.status(404).send("Missing required information");
    }
    if (req.body.Category === "No") {
      return res.status(404).send("No category");
    }

    const promises = [
      categoryService.findByName(req.body.Category),
      pollService.findByName(req.body.pool),
    ];

    const [Category, Poll] = await Promise.all(promises);
    console.log(req.body.department);

    const data = {
      idPoll: Poll._id,
      idDepartment: req.body.department,
      idCategory: Category._id,
      contentIdea: req.body.content,
      urlFile: null,
      status: "Draft",
      idStaffIdea: id,
    };
    if (newFilePath) {
      data.urlFile = newFilePath;
    }
    if (req.body.status) {
      data.status = req.body.status;
    }

    const newIdea = await ideaService.createIdea(data);

    if (!newIdea) {
      return res.status(500).send("Internal Server Error");
    }
    await categoryService.updateCategory(req.body.idCategory, { isUsed: true });

    const findLeader = await staffService.findLeader({
      idRole: "63f066f996329eb058cc3095",
      idDepartment: req.body.department,
    });

    if (!findLeader) {
      return res.status(404).send("The Department has no leader");
    }

    sendMail.sendConfirmationEmail(
      findLeader.email,
      "<h1> you has new idea</h1>",
      "new Idea",
    );

    // return res.redirect(`http://localhost:3000/1/${req.body.idStaffIdea}`);
    return res.redirect("/profile");
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:107 ~ createIdea ~ err:", err);
    return err;
  }
};

const displayDetailIdea = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const role = staff.idRole.nameRole;
    const data = { ideas: "John", comments: [] };

    if (!req.params.id) return res.redirect("/errors");
    const idea = await ideaService.getIdea(req.params.id);
    const comment = await commentService.getAllCommentOfIdea(idea._id);
    if (!idea || !comment) return res.redirect("/errors");
    if (idea.idStaffIdea == null) return res.redirect("/errors");

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

    allIdea.docs.forEach((element, index) => {
      if (
        typeof element.urlFile === "undefined" ||
        !isImageUrl(element.urlFile)
      ) {
        element.urlFile = null;
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
    // console.log(
    //   "🚀 ~ file: idea.controller.js:235 ~ displayAllIdea ~ all:",
    //   all,
    // );

    if (!all.docs) return res.redirect("/errors");
    const idStaffIdeas = all.docs.map((obj) => obj.idStaffIdea);

    const uniqueIdStaffIdeas = new Set(idStaffIdeas);
    const participants = uniqueIdStaffIdeas.size;

    const percentage = `${(
      (allIdea.totalDocs / allIdea.totalDocs) *
      100
    ).toFixed(2)}%`;

    const polls = await pollService.getPollActivated();

    const departments = await departmentService.getDepartmentActivated();

    // return res.json(allIdea.docs);
    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/homePage",
      staff,
      role: staff.idRole.nameRole,
      ideas: allIdea,
      participants,
      percentage,
      polls,
      departments,
    });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

const displayAllIdeaWithFilter = async (req, res) => {
  try {
    // const staff = req.cookies.Staff;
    // console.log(
    //   "🚀 ~ file: idea.controller.js:290 ~ displayAllIdeaWithFilter ~ staff:",
    //   staff,
    // );

    // const show1 = req.query.Sort;
    // console.log(
    //   "🚀 ~ file: idea.controller.js:293 ~ displayAllIdeaWithFilter ~ show1:",
    //   show1,
    // );

    // const show2 = req.query.idPoll;
    // console.log(
    //   "🚀 ~ file: idea.controller.js:296 ~ displayAllIdeaWithFilter ~ show2:",
    //   show2,
    // );

    // const show3 = req.query.idDepartment;
    // console.log(
    //   "🚀 ~ file: idea.controller.js:299 ~ displayAllIdeaWithFilter ~ show3:",
    //   show3,
    // );

    // const show4 = req.query.Exception;
    // console.log(
    //   "🚀 ~ file: idea.controller.js:302 ~ displayAllIdeaWithFilter ~ show4:",
    //   show4,
    // );

    // const anonymous = {
    //   fullName: "anonymous",
    //   avatarImage: null,
    // };

    // const allIdea = await ideaModel.find();

    // const IdeaFilled = await ideaModel.aggregate([
    //   // Lấy các Idea theo trạng thái Public
    //   { $match: { status: "PUBLIC" } },

    //   // Thêm trường mới là số lượng Comment của mỗi Idea
    //   {
    //     $lookup: {
    //       from: "comments",
    //       localField: "_id",
    //       foreignField: "idIdea",
    //       as: "comments",
    //     },
    //   },
    //   { $addFields: { commentCount: { $size: "$comments" } } },

    //   // Lọc ra các Idea chưa có Comment
    //   { $match: { commentCount: 0 } },

    //   // Sắp xếp theo likeCount và viewCount giảm dần -1 giam dan 1 tang dan
    //   { $sort: { likeCount: -1, viewCount: -1 } },
    // ]);

    // const polls = await pollService.getPollActivated();
    // const departments = await departmentService.getDepartmentActivated();

    return res.status(200).send("OK");
    // return res.render("partials/master", {
    //   title: "Idea",
    //   content: "../staff/homePage",
    //   staff,
    //   role: staff.idRole.nameRole,
    //   ideas: IdeaFilled,
    //   polls,
    //   departments,
    // });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
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

    const allIdea = await ideaService.getAllWithQuery(options, query);

    allIdea.docs.forEach((element) => {
      if (
        typeof element.urlFile === "undefined" ||
        !isImageUrl(element.urlFile)
      ) {
        element.urlFile = null;
      }
    });
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

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteIdeaById = await ideaService.deleteIdea(id);
    console.log(deleteIdeaById);

    return res.redirect("/profile");
  } catch (error) {
    return error;
  }
};

module.exports = {
  renderCreateIdeaPage,
  createIdea,
  displayDetailIdea,
  displayAllIdea,
  getIdeaForStaff,
  renderEditIdeaPage,
  deleteIdea,
  displayAllIdeaWithFilter,
};
