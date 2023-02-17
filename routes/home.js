const express = require("express");

const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const IdeaController = require("../controllers/idea.controller");

router.get("/", (req, res) => {
  // eslint-disable-next-line max-len, max-len, max-len
  res.render("partials/master", {
    title: "Express",
    content: "../staff/homePage",
  });
});

router.get("/", IdeaController.displayAllIdea);

router.get("/idea/:idIdea", IdeaController.displayDetailIdea);

// router.post("/idea/:idIdea", CommentController.createComment);

// router.put("/idea/:idIdea&:idComment", CommentController.updateComment);

// router.delete("/idea/:idIdea&:idComment", CommentController.deleteComment);

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
