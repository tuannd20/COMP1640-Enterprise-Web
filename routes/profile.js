const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });
const express = require("express");

const router = express.Router();
const AccountController = require("../controllers/account.controller");
const IdeaController = require("../controllers/idea.controller");

router.get("/", IdeaController.getIdeaForStaff);

// router.get("/:idAccount", AccountController.displayAccountById);
router.get("/idea", IdeaController.getIdeaForStaff);
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
