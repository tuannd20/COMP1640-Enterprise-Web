const express = require("express");

const router = express.Router();
const DepartmentController = require("../controllers/department.controller");
const CategoryController = require("../controllers/category.controller");

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

module.exports = router;
