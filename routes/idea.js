/* eslint-disable import/no-unresolved */
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });
const express = require("express");

const router = express.Router();
const interactController = require("../controllers/interact.controller");
const IdeaController = require("../controllers/idea.controller");

// router.get("/createNewIdea", IdeaController.createIdea);
router.get("/", IdeaController.renderCreateIdeaPage);

router.get("/:id", IdeaController.renderEditIdeaPage);

router.get("/:id/detail", IdeaController.displayDetailIdea);

router.post("/uploadIdea", upload.single("file"), IdeaController.createIdea);

router.put("/like", interactController.LikeIdea);

router.put("/dislike", interactController.DisLikeIdea);

router.delete("/:id", IdeaController.deleteIdea);

router.get("/filter", IdeaController.displayAllIdeaWithFilter);

module.exports = router;
