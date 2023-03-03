/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const multer = require("multer");
// eslint-disable-next-line import/no-unresolved
const isImageUrl = require("is-image-url");

const upload = multer({ dest: "public/uploads/" });

const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
const departmentService = require("../services/department.service");
const pollService = require("../services/poll.service");
const staffIdeaService = require("../services/staffIdea.service");
const StaffIdeaModel = require("../database/models/StaffIdea");
const sendMail = require("../utilities/sendMail");
const Staff = require("../database/models/Staff");

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
  return res.render("partials/master", {
    title: "Your Idea",
    content: "../staff/idea/createIdeaPage",
    staff,
    role: staff.idRole.nameRole,
  });
};

const renderEditIdeaPage = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = req.cookies.Staff;
    const departments = await departmentService.getAllDepartment();
    const idea = await ideaService.getIdea(id);
    console.log(idea);

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
    const promises = [
      departmentService.findByName(req.body.department),
      categoryService.findByName(req.body.Category),
      pollService.findByName(req.body.pool),
    ];

    const [Department, Category, Poll] = await Promise.all(promises);

    const data = {
      idPoll: Poll._id,
      idDepartment: Department._id,
      idCategory: Category._id,
      contentIdea: req.body.contentIdea,
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
      idDepartment: Department._id,
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
    return res.status(200).send(data);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:107 ~ createIdea ~ err:", err);
    return err;
  }
};

const displayDetailIdea = async (req, res) => {
  try {
    const data = { ideas: "John", comments: [] };

    if (!req.params.idIdea) return res.redirect("/404");
    const idea = await ideaService.getIdea(req.params.idIdea);
    console.log(
      "🚀 ~ file: idea.controller.js:115 ~ displayDetailIdea ~ idea:",
      idea,
    );
    if (!idea) return res.redirect("/404");
    if (idea.idStaffIdea == null) return res.redirect("/404");
    // return res.status(200).send(Idea);
    // return res.render("partials/master", {
    //   title: "Idea",
    //   content: "../staff/idea/ideaDetailPage",
    // idea,
    // comments,
    // });
    data.ideas = idea;

    // return res.status(200).send(data);
    return res.render("partials/master", {
      title: "Department Create",
      content: "../staff/idea/detailIdea",
      data,
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
      avatarImage:
        "https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png",
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

    if (!allIdea.docs) return res.redirect("/404");
    const allStaffIdea = await staffIdeaService.findAllByOptions({
      idStaff: staff._id,
    });

    allIdea.docs.forEach((element, index) => {
      if (
        typeof element.urlFile === "undefined" ||
        !isImageUrl(element.urlFile)
      ) {
        element.urlFile = null;
      }
      if (!element.idStaffIdea) {
        element.idStaffIdea = anonymous;
      }
    });

    if (allStaffIdea) {
      const ideaMapping = {};
      for (const idea of allIdea.docs) {
        ideaMapping[idea.idStaffIdea._id] = idea._id;
        idea.isLike = null;
      }

      for (const staffIdea of allStaffIdea) {
        const ideaId = ideaMapping[staffIdea.idStaff.toString()];
        if (ideaId && ideaId.toString() === staffIdea.IdIdea.toString()) {
          const ideaIndex = allIdea.docs.findIndex(
            (idea) => idea._id.toString() === ideaId.toString(),
          );
          if (ideaIndex !== -1) {
            const isLiked = staffIdea.isLike === true;
            const isDisliked = staffIdea.isLike === false;

            allIdea.docs[ideaIndex].isLike = isLiked ? true : false;
            allIdea.docs[ideaIndex].isDislike = isDisliked ? true : false;
          }
        }
      }
    }

    // return res.json(allIdea);
    // return res.render("partials/master", {
    //   title: "Idea",
    //   content: "../staff/homePage",
    //   staff,
    //   role: staff.idRole.nameRole,
    //   ideas: allIdea,
    // });
    return res.status(200).send(allIdea.docs);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

const getIdeaForStaff = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const StaffData = req.cookies.Staff;
    const id = StaffData._id;
    const { page } = req.query;
    const limit = 5;
    const options = {
      page,
      limit,
      populate: { path: "idStaffIdea", model: Staff },

      query: { idStaffIdea: id },
      sort: { createdAt: -1 },
    };
    const staffPayload = await staffService.displayStaffById(id);

    if (!staffPayload) return res.redirect("/404");
    if (typeof staffPayload.avatarImage === "undefined") {
      staffPayload.avatarImage = null;
    }
    const allIdea = await ideaService.getALl(options);

    allIdea.docs.forEach((element) => {
      if (
        typeof element.urlFile === "undefined" ||
        !isImageUrl(element.urlFile)
      ) {
        // eslint-disable-next-line no-param-reassign
        element.urlFile = null;
      }
    });
    allIdea.docs = allIdea.docs.filter((doc) => doc.idStaffIdea !== null);

    const data = { allIdea, staffPayload };
    console.log(data.allIdea.docs);

    let isHaveIdeas = true;
    if (data.allIdea.docs.toString() === "") {
      isHaveIdeas = false;
    }

    return res.render("partials/master", {
      title: "Your profile",
      content: "../staff/profilePage",
      data,
      staff,
      role: staff.idRole.nameRole,
      isHaveIdeas,
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
  createIdea,
  displayDetailIdea,
  displayAllIdea,
  getIdeaForStaff,
  renderEditIdeaPage,
};
