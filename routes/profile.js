const express = require("express");

const router = express.Router();
const AccountController = require("../controllers/account.controller");
const IdeaController = require("../controllers/idea.controller");

// router.get("/:idAccount", AccountController.displayAccountById);
router.get("/:page/:id", IdeaController.getIdeaForStaff);
// router.post("/idea", IdeaController.createIdea);
// router.put("/:idIdea", IdeaController.updateIdea);
// router.delete("/:idIdea", IdeaController.deleteIdea);

module.exports = router;
