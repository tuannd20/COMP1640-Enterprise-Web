/* eslint-disable import/no-unresolved */
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });
const express = require("express");

const router = express.Router();
const interactController = require("../controllers/interact.controller");
const IdeaController = require("../controllers/idea.controller");
const renderIdeaController = require("../controllers/renderIdea.controller");

// router.get("/createNewIdea", IdeaController.createIdea);
router.get("/", renderIdeaController.renderCreateIdeaPage);

router.get("/:id", renderIdeaController.renderEditIdeaPage);

router.get("/:id/detail", IdeaController.displayDetailIdea);

router.post("/uploadIdea", upload.single("file"), IdeaController.createIdea);

router.put("/updateIdea", upload.none(), IdeaController.updateIdea);

router.put("/like", interactController.LikeIdea);

router.put("/dislike", interactController.DisLikeIdea);

router.delete("/:id", IdeaController.deleteIdea);

module.exports = router;
