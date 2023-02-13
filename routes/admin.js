const express = require("express");

const AccountController = require("../controllers/account.controller");
const RuleController = require("../controllers/rule.controller");

const router = express.Router();

router.get("/account", AccountController.getAllStaff);
router.post("/account/create", AccountController.createStaff);
// router.put("/account/edit", AccountController.displayListAccount);

router.get("/terms", RuleController.getAllRule);

module.exports = router;
