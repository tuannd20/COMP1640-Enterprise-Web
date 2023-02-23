const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AccountController = require("../controllers/account.controller");

router.get("/login", AuthController.renderLoginPage);

router.post("/login", AuthController.login);
router.post("/login", AccountController.login);

router.get("/logout", AuthController.logout);

module.exports = router;
