const express = require("express");

const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

router.get("/categories", CategoryController.renderListCategoryPage);
// get
router.get("/category/create", CategoryController.rederCreateCategoryPage);

router.post("/category/create", CategoryController.createCategory);

router.get("/category/edit/:id", CategoryController.getEditCategory);

router.post("/category/edit/:id", CategoryController.updateCategory);

router.get("/category/delete/:id", CategoryController.deleteOneCategory);

router.get("/category/delete-all", CategoryController.deleteAllCategory);

module.exports = router;
