const express = require("express");

const router = express.Router();
const cloudinary = require("../utilities/cloudinary");
const upload = require("../utilities/multer");
const DepartmentController = require("../controllers/department.controller");
const CategoryController = require("../controllers/category.controller");
const PollController = require("../controllers/poll.controller");

router.get(
  "/departments/activated",
  DepartmentController.getDepartmentActivated,
);

router.get(
  "/departments/activated",
  DepartmentController.getDepartmentActivated,
);

// Categories API
router.get(
  "/categories/department/:idDepartment",
  CategoryController.findCategoryByIdDepartment,
);

// Categories API
router.get("/poll", PollController.getPollNewest);

// Upload file to cloud
router.post("/cloud", upload.single("files"), async (req, res) => {
  try {
    console.log(req.file);
    const folder = "Idea";
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder,
      resource_type: "video",
    });

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
