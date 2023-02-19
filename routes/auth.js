const express = require("express");

const router = express.Router();
const AccountController = require("../controllers/account.controller");
const AuthController = require("../controllers/auth.controller");

router.get("/login", AuthController.renderLoginPage);

router.post("/login", AccountController.login);

router.get("/logout", AuthController.logout);

module.exports = router;
