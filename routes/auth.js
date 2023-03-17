const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.get("/login", AuthController.renderLoginPage);

router.post("/login", AuthController.login);
// router.post("/login", AccountController.login);

router.get("/logout", AuthController.logout);

router.patch("/changePassword", AuthController.updatePassword);

module.exports = router;
