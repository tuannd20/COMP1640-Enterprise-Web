const express = require("express");

const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AccountController = require("../controllers/account.controller");

router.get("/login", AccountController.index);

router.post("/login", AuthController.login);
router.post("/login", AccountController.login);

router.get("/logout", AccountController.logout);

module.exports = router;
