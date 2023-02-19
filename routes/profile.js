const express = require("express");

const router = express.Router();
const AccountController = require("../controllers/account.controller");

router.get("/", AccountController.renderProfilePage);

// router.get("/:idAccount", AccountController.displayAccountById);
// router.get("/idea", IdeaController.createIdea);
// router.post("/idea", IdeaController.createIdea);
// router.put("/:idIdea", IdeaController.updateIdea);
// router.delete("/:idIdea", IdeaController.deleteIdea);

module.exports = router;
