const express = require("express");

const router = express.Router();
const StaffController = require("../controllers/staff.controller");
const AuthController = require("../controllers/auth.controller");

router.get("/login", StaffController.index);

router.post("/login", AuthController.login);

router.get("/logout", StaffController.logout);

module.exports = router;
