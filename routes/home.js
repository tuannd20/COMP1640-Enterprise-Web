const express = require("express");

const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const IdeaController = require("../controllers/idea.controller");
const renderIdeaController = require("../controllers/renderIdea.controller");

const TermsController = require("../controllers/rule.controller");
const AuthMiddleWare = require("../middlerwares/auth.middleware");

// router.get("/", (req, res) => {
//   // eslint-disable-next-line max-len, max-len, max-len
//   res.render("partials/master", {
//     title: "Express",
//     content: "../staff/homePage",
//   });
// });

router.get("/", renderIdeaController.displayAllIdea);

router.get("/comments/:idIdea", CommentController.displayAllCommentOfIdea);

router.post("/comments", CommentController.createComment);

router.get("/terms", TermsController.displayAllRule);

// router.post("/idea/:idIdea", CommentController.createComment);

// router.put("/idea/:idIdea&:idComment", CommentController.updateComment);

router.delete("/comments/:idComment", CommentController.deleteComment);

router.get("/errors", (req, res) => {
  let staff = req.cookies.Staff;
  if (typeof staff === "undefined") {
    staff = "";
  }
  res.render("partials/master", {
    title: "Error 404",
    content: "../404/404",
    staff,
    role: staff.idRole.nameRole,
  });
});

module.exports = router;
