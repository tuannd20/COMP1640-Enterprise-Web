/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const multer = require("multer");
// eslint-disable-next-line import/no-unresolved
const isImageUrl = require("is-image-url");

const upload = multer({ dest: "public/uploads/" });

const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
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
  const categories = await categoryService.getAllCategory();
  const newCategory = Object.values(
    categories.reduce((acc, obj) => {
      console.log(
        "🚀 ~ file: idea.controller.js:34 ~ categories.reduce ~ obj:",
        obj,
      );
      console.log(
        "🚀 ~ file: idea.controller.js:35 ~ categories.reduce ~ acc:",
        acc,
      );
      if (!acc[obj.idDepartment]) {
        acc[obj.idDepartment] = obj;
      } else {
        acc[obj.idDepartment.nameDepartment].content += obj.content;
      }
      return acc;
    }, {}),
  ).map((obj) => obj.content);
  console.log(
    "🚀 ~ file: idea.controller.js:42 ~ renderCreateIdeaPage ~ newCategory:",
    newCategory,
  );
  const staff = req.cookies.Staff;
  return res.render("partials/master", {
    title: "Your Idea",
    content: "../staff/idea/createIdeaPage",
    staff,
  });
};

const createIdea = async (req, res) => {
  try {
    const StaffData = req.cookies.Staff;
    const id = StaffData._id;
    const filePath = req.file.path;

    const fileName = req.file.originalname;
    const newFilePath = `public/uploads/${fileName}`;
    fs.renameSync(filePath, newFilePath);

    // Add file path to data and save to JSON file
    const newData = {
      mediaPath: newFilePath, // Add file path to data
    };
    console.log(
      "🚀 ~ file: idea.controller.js:59 ~ createIdea ~ req.body:",
      req.body,
    );

    if (
      !req.body.idPoll ||
      !req.body.idDepartment ||
      !req.body.idCategory ||
      !req.body.contentIdea
    ) {
      return res.status(404).send("Missing required information");
    }

    const data = {
      idPoll: req.body.idPoll,
      idDepartment: req.body.idDepartment,
      idCategory: req.body.idCategory,
      contentIdea: req.body.contentIdea,
      urlFile: null,
      status: "Draft",
      idStaffIdea: id,
    };
    if (req.body.urlFile) {
      data.urlFile = req.body.urlFile;
    }
    if (req.body.status) {
      data.status = req.body.status;
    }

    // const newIdea = await ideaService.createIdea(data);
    // if (!newIdea) {
    //   return res.status(500).send("Internal Server Error");
    // }
    // await categoryService.updateCategory(req.body.idCategory, { isUsed: true });

    // const findLeader = await staffService.findLeader({
    //   idRole: "63f066f996329eb058cc3095",
    //   idDepartment: req.body.idDepartment,
    // });
    // if (!findLeader) {
    //   return res.status(404).send("The Department has no leader");
    // }
    // sendMail.sendConfirmationEmail(
    //   findLeader.email,
    //   "<h1> you has new idea</h1>",
    //   "new Idea",
    // );

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
    if (!idea) return res.redirect("/404");
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
    const { page = 1 } = req.query;
    const limit = 5;
    const options = {
      page,
      limit,
      populate: { path: "idStaffIdea", model: Staff },
      sort: { createdAt: -1 },
    };

    const allIdea = await ideaService.getALl(options);
    if (!allIdea) return res.redirect("/404");
    allIdea.docs.forEach((element, index) => {
      if (
        typeof element.urlFile === "undefined" ||
        !isImageUrl(element.urlFile)
      ) {
        // eslint-disable-next-line no-param-reassign
        element.urlFile = null;
      }
    });
    allIdea.docs = allIdea.docs.filter((doc) => doc.idStaffIdea !== null);
    // return res.json(allIdea);
    console.log(
      "🚀 ~ file: idea.controller.js:170 ~ displayAllIdea ~ allIdea:",
      allIdea,
    );

    return res.render("partials/master", {
      title: "Idea",
      content: "../staff/homePage",
      staff,
      ideas: allIdea,
    });
    // return res.status(200).send(allIdea);
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:68 ~ displayAllIdea ~ err", err);
    return err;
  }
};

const getIdeaForStaff = async (req, res) => {
  try {
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
    const staff = await staffService.displayStaffById(id);

    if (!staff) return res.redirect("/404");
    if (typeof staff.avatarImage === "undefined") {
      staff.avatarImage = null;
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
module.exports = {
  renderCreateIdeaPage,
  createIdea,
  displayDetailIdea,
  displayAllIdea,
  getIdeaForStaff,
};
