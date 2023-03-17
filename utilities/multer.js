const path = require("path");
const multer = require("multer");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log("file name: ", ext);
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //   cb(new Error("File type is not supported"), false);
    //   return;
    // }
    cb(null, true);
  },
});
