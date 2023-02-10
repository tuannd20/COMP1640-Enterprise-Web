const express = require("express");

const router = express.Router();
const RoleController = require("../controllers/role.controller");
const { isLoggedIn } = require("../middlerwares/auth.middleware");

router.get("/", RoleController.createRole);
router.post("/", isLoggedIn, RoleController.createRole);

module.exports = router;
