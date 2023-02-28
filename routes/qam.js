const express = require("express");

const router = express.Router();
const PollController = require("../controllers/poll.controller");
const DepartmentController = require("../controllers/department.controller");
const AccountController = require("../controllers/manageQA.controller");

router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});

// Router for Account
router.get("/manage-qa", AccountController.getAllStaff);
router.get("/manage-qa/create", AccountController.renderCreateAccountPage);
router.post("/manage-qa/create", AccountController.createStaff);
router.get("/manage-qa/edit/:id", AccountController.renderEditAccountPage);
router.post("/manage-qa/edit/:id", AccountController.updateStaff);

// [GET] create department
router.get("/department/create", DepartmentController.getCreateDepartment);

// [POST] create department
router.post("/department/create", DepartmentController.createDepartment);

// [GET] edit department
router.get("/department/edit/:id", DepartmentController.getEditDepartment);

// [PUT] update department
router.post("/department/edit/:id", DepartmentController.updateDepartment);

// [DELETE] delete department
router.delete(
  "/department/delete/:id",
  DepartmentController.deleteOneDepartment,
);

// [DELETE] delete department
router.get("/department/delete-all", DepartmentController.deleteAllDepartment);

// [GET] all department
router.get("/department/", DepartmentController.getAllDepartment);

// [GET] all Department Activated
router.get(
  "/department/activated",
  DepartmentController.getDepartmentActivated,
);

// [GET] create Poll
router.get("/poll/create", PollController.getCreatePoll);

// [POST] create Poll
router.post("/poll/create", PollController.createPoll);

// [GET] edit Poll
router.get("/poll/edit/:id", PollController.getEditPoll);

// [PUT] update Poll
router.post("/poll/edit/:id", PollController.updatePoll);

// [DELETE] delete Poll
router.delete("/poll/delete/:id", PollController.deleteOnePoll);

// [DELETE] delete Poll
router.get("/poll/delete-all", PollController.deleteAllPoll);

// [GET] all Poll
router.get("/poll/", PollController.getAllPoll);

// [GET] all Poll Activated
router.get("/poll/activated", PollController.getPollActivated);

module.exports = router;
