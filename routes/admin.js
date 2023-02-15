const express = require("express");

const AccountController = require("../controllers/account.controller");
const RuleController = require("../controllers/rule.controller");

const router = express.Router();

// Router for Account
router.get("/account", AccountController.getAllStaff);
router.get("/account/create", AccountController.renderCreateAccountPage);
router.post("/account/create", AccountController.createStaff);
router.get("/account/edit/:id", AccountController.renderEditAccountPage);
router.post("/account/edit/:id", AccountController.updateStaff);
router.delete("/account/delete/:id", AccountController.deleteOneStaff);

// Router for Terms
router.get("/terms", RuleController.getAllRule);
router.get("/terms/create", RuleController.renderCreateTermsPage);
router.post("/terms/create", RuleController.createRule);
router.get("/terms/edit/:id", RuleController.renderEditTermsPage);
router.post("/terms/edit/:id", RuleController.updateRule);

module.exports = router;
