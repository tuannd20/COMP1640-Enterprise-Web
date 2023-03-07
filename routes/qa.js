const express = require("express");

const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

router.get("/categories", CategoryController.renderListCategoryPage);
// get
router.get("/categories/create-page", CategoryController.rederCreateCategoryPage);

router.post("/categories", CategoryController.createCategory);

router.get("/categories/edit-page/:id", CategoryController.getEditCategory);

router.put("/categories/:id", CategoryController.updateCategory);

router.delete("/categories/:id", CategoryController.deleteOneCategory);

// router.get("/categories/delete-all", CategoryController.deleteAllCategory);

router.get("/categories/department/:id", CategoryController.findCategoryByIdDepartment);

module.exports = router;
