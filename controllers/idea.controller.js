const fs = require("fs");
const console = require("console");

const ideaService = require("../services/idea.service");
const staffService = require("../services/staff.service");
const categoryService = require("../services/category.service");
const pollService = require("../services/poll.service");
const sendMail = require("../utilities/sendMail");
const cloudinary = require("../utilities/cloudinary");

const handleUploadFile = async (path, type) => {
  const folder = "Idea";
  if (type === "mp4") {
    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      folder,
      resource_type: "video",
    });

    const resultVideo = {
      url: cloudinaryResponse.url,
      cloudinaryId: cloudinaryResponse.public_id,
    };

    return resultVideo;
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(path, {
    folder,
  });
  const result = {
    url: cloudinaryResponse.url,
    cloudinaryId: cloudinaryResponse.public_id,
  };

  return result;
};

const createIdea = async (req, res) => {
  try {
    const file = req.files;
    const StaffData = req.cookies.Staff;
    const id = StaffData._id;
    const fileNameUpload = [];
    const cloudinaryId = [];
    const urlFile = [];
    const uploadData = [];

    console.log(file);
    console.log(req.body);

    // if (req.files) {
    //   for (let i = 0; i < req.files.length; i + 1) {
    //     const fileName = req.files[i].originalname;
    //     fileNameUpload.push(fileName);
    //   }
    // }

    if (file) {
      // eslint-disable-next-line no-restricted-syntax
      for (const fileUpload of file) {
        const { path, originalname } = fileUpload;
        console.log(path);
        fileNameUpload.push(originalname);

        const fileExtension = originalname.slice(
          // eslint-disable-next-line no-bitwise
          ((originalname.lastIndexOf(".") - 1) >>> 0) + 2,
        );
        console.log("Get the extension of the uploaded file: ", fileExtension);

        // eslint-disable-next-line no-await-in-loop
        const newPath = await handleUploadFile(path, fileExtension);
        console.log("dataaa :", newPath);

        uploadData.push(newPath);

        // cloudinaryId.push(newPath.cloudinaryId);
        // urlFile.push(newPath.url);
        fs.unlinkSync(path);
      }

      // eslint-disable-next-line array-callback-return
      uploadData.map((item) => {
        cloudinaryId.push(item.cloudinaryId);
        urlFile.push(item.url);
      });
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
    const data = {
      idPoll: Poll._id,
      idDepartment: req.body.department,
      idCategory: Category._id,
      contentIdea: req.body.content,
      urlFile: null,
      status: "Draft",
      idStaffIdea: id,
    };
    if (fileNameUpload.length > 0) {
      data.fileName = fileNameUpload;
      data.urlFile = urlFile;
      data.cloudinary_id = cloudinaryId;
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

    return res.redirect("/profile");
  } catch (err) {
    console.error("🚀 ~ file: idea.controller.js:107 ~ createIdea ~ err:", err);
    return err;
  }
};

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    await ideaService.deleteIdea(id);

    return res.redirect("/profile");
  } catch (error) {
    return error;
  }
};

const updateIdea = async (req, res) => {
  try {
    if (!req.body.ideaId) {
      return res.redirect("/errors");
    }
    const filepaths = [];

    if (req.files) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < req.files.length; i++) {
        const filePath = req.files[i].path;
        const fileName = req.files[i].originalname;
        const newFilePath = `public/uploads/${fileName}`;
        fs.renameSync(filePath, newFilePath);
        filepaths.push(newFilePath);
      }
    }

    const Category = await categoryService.findByName(req.body.idCategory);

    const data = {
      idDepartment: req.body.department,
      idCategory: Category._id,
      contentIdea: req.body.content,
      urlFile: null,
      status: "Draft",
    };
    if (filepaths.length > 0) {
      data.urlFile = filepaths;
    }
    if (req.body.status) {
      data.status = req.body.status;
    }
    const newIdea = await ideaService.updateIdea(req.body.ideaId, data);

    if (!newIdea) {
      return res.redirect("/errors");
    }
    return res.redirect("/profile");
  } catch (error) {
    return error;
  }
};

module.exports = {
  createIdea,
  deleteIdea,
  updateIdea,
};
