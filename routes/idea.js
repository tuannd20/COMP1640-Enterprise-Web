const express = require("express");

const router = express.Router();
const IdeaController = require("../controllers/idea.controller");

// router.get("/createNewIdea", IdeaController.createIdea);
router.get("/createNewIdea", IdeaController.renderCreateIdeaPage);

router.post("/isLike", IdeaController.updateStatus);

module.exports = router;
