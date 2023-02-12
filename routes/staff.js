const express = require("express");

const router = express.Router();
const StaffController = require("../controllers/staff.controller");

router.get("/create", StaffController.createStaff);
router.post("/create", StaffController.createStaff);
router.get("/getAllStaff", StaffController.getAllStaff);

module.exports = router;
