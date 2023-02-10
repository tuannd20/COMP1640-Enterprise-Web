const express = require("express");

const router = express.Router();
const StaffController = require("../controllers/staff.controller");

router.get("/", StaffController.displayStaffById);
router.post("/staff", StaffController.getStaffByEmail);

module.exports = router;
