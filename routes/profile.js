const multer = require("multer");

const express = require("express");
const upload = require("../utilities/multer");

const router = express.Router();
const AccountController = require("../controllers/account.controller");
const renderIdeaController = require("../controllers/renderIdea.controller");

router.get("/", renderIdeaController.getIdeaForStaff);

// router.get("/:idAccount", AccountController.displayAccountById);
router.get("/idea", renderIdeaController.getIdeaForStaff);
// router.post("/idea", IdeaController.createIdea);
// router.put("/:idIdea", IdeaController.updateIdea);
// router.delete("/:idIdea", IdeaController.deleteIdea);
router.get("/edit/:id", AccountController.renderEditProfilePage);
router.put("/edit-profile/:id", AccountController.updateStaff);
router.put(
  "/:idProfile",
  upload.single("avatarImage"),
  AccountController.handleUpdateProfileAccount,
);

module.exports = router;
