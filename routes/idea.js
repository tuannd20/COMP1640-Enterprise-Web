const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });
const express = require("express");

const router = express.Router();
const interactController = require("../controllers/interact.controller");
const IdeaController = require("../controllers/idea.controller");
const /* Rendering the page for the user to create an idea. */
  renderIdeaController = require("../controllers/renderIdea.controller");

router.get("/", renderIdeaController.renderCreateIdeaPage);
router.get("/:id", renderIdeaController.renderEditIdeaPage);
router.get("/:id/detail", renderIdeaController.displayDetailIdea);

router.post("/uploadIdea", upload.array("file"), IdeaController.createIdea);
router.put("/updateIdea", upload.any(), (req, res) => {
  IdeaController.updateIdea(req, res);
});

router.put("/like", interactController.LikeIdea);
router.put("/dislike", interactController.DisLikeIdea);

router.delete("/:id", IdeaController.deleteIdea);

module.exports = router;
