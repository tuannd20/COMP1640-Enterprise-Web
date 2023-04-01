const express = require("express");

const router = express.Router();
const PollController = require("../controllers/poll.controller");
const DepartmentController = require("../controllers/department.controller");
const AccountController = require("../controllers/manageQA.controller");
const CategoryController = require("../controllers/category.qam.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

// qa
router.get("/qas", AccountController.getAllStaff);
router.get("/qas/create-page/:id", AccountController.renderCreateAccountPage);
router.post("/qas", AccountController.createStaff);
router.get("/qas/edit-page/:id", AccountController.renderEditAccountPage);
router.put("/qas/:id", AccountController.updateStaff);

// department
router.get("/departments", DepartmentController.getAllDepartment);
router.get(
  "/departments/create-page",
  DepartmentController.getCreateDepartment,
);
router.post("/departments", DepartmentController.createDepartment);
router.get(
  "/departments/edit-page/:id",
  DepartmentController.getEditDepartment,
);
router.put("/departments/:id", DepartmentController.updateDepartment);
router.delete("/departments/:id", DepartmentController.deleteOneDepartment);

// create Poll
router.get("/polls", PollController.getAllPoll);
router.get("/polls/create-page", PollController.getCreatePoll);
router.post("/polls", PollController.createPoll);
router.get("/polls/edit-page/:id", PollController.getEditPoll);
router.put("/polls/:id", PollController.updatePoll);
router.delete("/polls/:id", PollController.deleteOnePoll);
// router.get("/polls/delete-all", PollController.deleteAllPoll);
// router.get("/polls/activated", PollController.getPollActivated);

router.get("/categories", CategoryController.renderListCategoryPage);

router.get(
  "/categories/create-page",
  CategoryController.renderCreateCategoryPage,
);

router.post("/categories", CategoryController.createCategory);

router.get("/categories/edit-page/:id", CategoryController.getEditCategory);

router.put("/categories/:id", CategoryController.updateCategory);

router.delete("/categories/:id", CategoryController.deleteOneCategory);

router.get(
  "/categories/department/:id",
  CategoryController.findCategoryByIdDepartment,
);

module.exports = router;
