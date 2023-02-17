const express = require("express");

const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

router.get("/categories", CategoryController.getAllCategory);

// [GET] create department
// router.get("/category/create", CategoryController.createCategory);

// [POST] create department
router.post("/category/create", CategoryController.createCategory);

// [GET] edit department
// router.get("/category/edit/:id", CategoryController.updateCategory);

// [PUT] update department
router.put("/category/edit/:id", CategoryController.updateCategory);

// [DELETE] delete department
router.delete("/category/delete/:id", CategoryController.deleteOneCategory);

router.get("/category/", CategoryController.getAllCategory);

module.exports = router;
