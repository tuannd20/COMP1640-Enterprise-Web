const express = require("express");

const router = express.Router();
const AccountController = require("../controllers/account.controller");
const IdeaController = require("../controllers/idea.controller");
const renderIdeaController = require("../controllers/renderIdea.controller");

router.get("/", renderIdeaController.getIdeaForStaff);

// router.get("/:idAccount", AccountController.displayAccountById);
router.get("/idea", renderIdeaController.getIdeaForStaff);
// router.post("/idea", IdeaController.createIdea);
// router.put("/:idIdea", IdeaController.updateIdea);
// router.delete("/:idIdea", IdeaController.deleteIdea);
router.get("/edit/:id", AccountController.renderEditProfilePage);
router.put("/profile/edit/:id", AccountController.editProfilePage);

module.exports = router;
