/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const fs = require("fs");

const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
const pollService = require("../services/poll.service");
const sendMail = require("../utilities/sendMail");
const Staff = require("../database/models/Staff");
const ideaModel = require("../database/models/Idea");
const commentModel = require("../database/models/Comment");
// eslint-disable-next-line import/order
const console = require("console");

const createIdea = async (req, res) => {
  try {
    const StaffData = req.cookies.Staff;
    const id = StaffData._id;
    const filepaths = [];

    if (req.files) {
      for (let i = 0; i < req.files.length; i + 1) {
        const filePath = req.files[i].path;
        const fileName = req.files[i].originalname;
        const newFilePath = `public/uploads/${fileName}`;
        fs.renameSync(filePath, newFilePath);
        filepaths.push(newFilePath);
      }
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
    if (filepaths.length > 0) {
      data.urlFile = filepaths;
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

const updateIdea = async (req, res) => {
  try {
    console.log(
      "🚀 ~ file: idea.controller.js:136 ~ updateIdea ~ req:",
      req.body,
    );

    return res.status(200).send("oke");
  } catch (error) {
    return error;
  }
};

module.exports = {
  createIdea,
  deleteIdea,
  updateIdea,
};
