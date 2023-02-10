const express = require("express");

const router = express.Router();
const StaffController = require("../controllers/staff.controller");

router.get("/login", StaffController.index);

router.post("/login", StaffController.login);

router.get("/logout", StaffController.logout);

module.exports = router;
