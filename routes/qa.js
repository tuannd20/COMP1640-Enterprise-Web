const express = require("express");

const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

router.get("/categories", CategoryController.getAllCategory);
// get
router.get("/category/create", CategoryController.createCategory);

router.post("/category/create", CategoryController.createCategory);

router.put("/category/edit/:id", CategoryController.updateCategory);

router.put("/category/edit/:id", CategoryController.updateCategory);

router.delete("/category/delete/:id", CategoryController.deleteOneCategory);

router.get("/category/", CategoryController.getAllCategory);

module.exports = router;
