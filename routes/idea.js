const express = require("express");

const router = express.Router();
const IdeaController = require("../controllers/idea.controller");

router.get("/createNewIdea", IdeaController.createIdea);

module.exports = router;
