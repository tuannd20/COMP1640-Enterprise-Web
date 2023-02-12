const express = require("express");

const router = express.Router();
const DepartmentController = require("../controllers/department.controller");

// [GET] create department
router.get("/create", DepartmentController.getCreateDepartment);

// [POST] create department
router.post("/create", DepartmentController.createDepartment);

// [GET] edit department
router.get("/edit/:id", DepartmentController.getEditDepartment);

// [PUT] update department
router.put("/edit/:id", DepartmentController.updateDepartment);

// [DELETE] delete department
router.delete("/delete/:id", DepartmentController.deleteOneDepartment);

// [DELETE] delete department
router.delete("/delete-all", DepartmentController.deleteAllDepartment);

// [GET] all department
router.get("/", DepartmentController.getAllDepartment);

module.exports = router;
