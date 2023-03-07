const express = require("express");

const router = express.Router();
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

module.exports = router;
