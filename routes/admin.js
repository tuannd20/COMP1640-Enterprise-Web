const express = require("express");

const AccountController = require("../controllers/account.controller");
const RuleController = require("../controllers/rule.controller");

const router = express.Router();

// Router to display all accounts for staff
router.get("/account", AccountController.getAllStaff);

// Router for Create Account Staff and Render Account Staff Page
router.get("/accounts/example", AccountController.renderExampleAccountPage);
router.get("/account/create", AccountController.renderCreateAccountPage);
router.post("/account/create", AccountController.createStaff);

// Router for Create Account Staff and Render Account Staff Page
router.get("/account/edit/:id", AccountController.renderEditAccountPage);
router.put("/account/edit/:id", AccountController.updateStaff);
// router.get("/account/delete/:id", AccountController.deleteOneStaff);

// Router to display all terms
router.get("/terms", RuleController.getAllRule);

// Router for Create Terms and Render Create Terms Page
router.get("/terms/create", RuleController.renderCreateTermsPage);
router.post("/terms/create", RuleController.createRule);

// Router for Edit Terms and Render Edit Terms Page
router.get("/terms/edit/:id", RuleController.renderEditTermsPage);
router.put("/terms/edit/:id", RuleController.updateRule);

// Router for Delete Terms
router.delete("/terms/delete/:id", RuleController.deleteOneRule);

module.exports = router;
