const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });
const express = require("express");

const router = express.Router();
const IdeaController = require("../controllers/idea.controller");

// router.get("/createNewIdea", IdeaController.createIdea);
router.get("/createNewIdea", IdeaController.renderCreateIdeaPage);

router.post("/uploadIdea", upload.single("file"), IdeaController.createIdea);

router.post("/isLike", IdeaController.updateStatus);

module.exports = router;
