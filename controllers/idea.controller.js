/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const multer = require("multer");

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

const renderCreateIdeaPage = (req, res) => {
  try {
    const staff = req.cookies.Staff;
    return res.render("partials/master", {
      title: "Your Idea",
      content: "../staff/idea/createIdeaPage",
      staff,
    });
  } catch (error) {
    return error;
  }
};

const createIdea = async (req, res) => {
  try {
    const filePath = req.file.path;

    const fileName = req.file.originalname;
    const newFilePath = `public/uploads/${fileName}`;
    fs.renameSync(filePath, newFilePath);

    // Add file path to data and save to JSON file
    const newData = {
      mediaPath: newFilePath, // Add file path to data
    };
    console.log(
      "🚀 ~ file: idea.controller.js:56 ~ createIdea ~ req.body:",
      req.body,
    );
    if (
      !req.body.idPoll ||
      !req.body.idDepartment ||
      !req.body.idCategory ||
      !req.body.contentIdea ||
      !req.body.idStaffIdea
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
      idStaffIdea: req.body.idStaffIdea,
    };
    if (req.body.urlFile) {
      data.urlFile = req.body.urlFile;
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
      idDepartment: req.body.idDepartment,
    });
    if (!findLeader) {
      return res.status(404).send("The Department has no leader");
    }
    sendMail.sendConfirmationEmail(
      findLeader.email,
      "<h1> you has new idea</h1>",
      "new Idea",
    );

    res.redirect(`http://localhost:3000/1/${req.body.idStaffIdea}`);
    return res.status(200).send(newIdea);
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

    allIdea.docs.forEach((element) => {
      if (typeof element.urlFile === "undefined") {
        // eslint-disable-next-line no-param-reassign
        element.urlFile = null;
      }
    });

    console.log("Hello", allIdea);
    // return res.json(allIdea);
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
    if (
      !req.body.idIdea ||
      !req.body.idStaff ||
      typeof req.body.isLike === "undefined"
    ) {
      return res.status(404).send("Missing required information");
    }

    const findStatus = await StaffIdeaModel.findOne({
      idStaff: req.body.idStaff,
      idIdea: req.body.idIdea,
    });
    console.log(
      "🚀 ~ file: idea.controller.js:209 ~ updateStatus ~ findStatus:",
      findStatus,
    );

    const findIdea = await ideaService.getIdea(req.body.idIdea);

    if (!findIdea) {
      return res.status(404).send("idea not exist");
    }

    if (!findStatus) {
      const newStatus = await StaffIdeaModel.create({
        idStaff: req.body.idStaff,
        idIdea: req.body.idIdea,
        isLike: req.body.isLike,
        isView: false,
      });
      console.log(
        "🚀 ~ file: idea.controller.js:223 ~ updateStatus ~ newStatus:",
        newStatus,
      );
      if (req.body.isLike == true) {
        const newLike = findIdea.likeCount + 1;
        const newDisLike = findIdea.disLikeCount;
        await ideaService.updateIdea(findIdea._id, {
          likeCount: newLike,
        });
        return res.status(200).send({ newLike, newDisLike });
      }
      const newLike = findIdea.likeCount;
      const newDisLike = findIdea.disLikeCount + 1;
      await ideaService.updateIdea(findIdea._id, {
        disLikeCount: newDisLike,
      });
      return res.status(200).send({ newLike, newDisLike });
    }
    if (req.body.isLike == findStatus.isLike) {
      await StaffIdeaModel.findByIdAndUpdate(findStatus._id, { isLike: null });
      if (req.body.isLike == true) {
        const newLike = findIdea.likeCount - 1;
        const newDisLike = findIdea.disLikeCount;
        await ideaService.updateIdea(findIdea._id, {
          likeCount: newLike,
        });
        return res.status(200).send({ newLike, newDisLike });
      }
      const newLike = findIdea.likeCount;
      const newDisLike = findIdea.disLikeCount - 1;
      await ideaService.updateIdea(findIdea._id, {
        disLikeCount: newDisLike,
      });
      return res.status(200).send({ newLike, newDisLike });
    }
    if (req.body.isLike == true) {
      await StaffIdeaModel.findByIdAndUpdate(findStatus._id, {
        isLike: true,
      });

      const newLike = findIdea.likeCount + 1;
      const newDisLike = findIdea.disLikeCount;
      await ideaService.updateIdea(findIdea._id, {
        likeCount: newLike,
      });
      return res.status(200).send({ newLike, newDisLike });
    }
    await StaffIdeaModel.findByIdAndUpdate(findStatus._id, {
      isLike: false,
    });
    const newLike = findIdea.likeCount;
    const newDisLike = findIdea.disLikeCount + 1;
    await ideaService.updateIdea(findIdea._id, {
      disLikeCount: newDisLike,
    });
    return res.status(200).send({ newLike, newDisLike });
  } catch (err) {
    console.log("🚀 ~ file: idea.controller.js:256 ~ updateStatus ~ err:", err);
    return err;
  }
};
module.exports = {
  renderCreateIdeaPage,
  createIdea,
  displayDetailIdea,
  displayAllIdea,
  getIdeaForStaff,
  updateStatus,
};
