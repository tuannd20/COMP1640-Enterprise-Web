const CommentService = require("../services/comment.service");
const IdeaService = require("../services/idea.service");
const sendMail = require("../utilities/sendMail");

const displayAllComment = async (req, res) => {
  try {
    const comments = await CommentService.getAllComment();

    return res.json(comments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayAllCommentOfIdea = async (req, res) => {
  try {
    const idIdea = req.params;
    const comments = await CommentService.getAllCommentOfIdea(idIdea);

    return res.json(comments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createComment = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const idStaffComment = staff._id;
    const { comment, idIdea, isPublic = true } = req.body;
    if (!comment || !idIdea) return res.redirect("/errors");
    const comments = await CommentService.createComment({
      idIdea,
      idStaffComment,
      contentComment: comment,
      isPublic,
    });

    const idea = await IdeaService.getIdea(idIdea);
    sendMail.sendConfirmationEmail(
      idea.idStaffIdea.email,
      "<h1> you has new comment</h1>",
      "new comment",
    );

    return res.send(comments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteComment = async (req, res) => {
  try {
    const { idComment } = req.params;
    await CommentService.deleteComment(idComment);
    return res.send("Delete success");
  } catch (error) {
    return error;
  }
};

module.exports = {
  displayAllComment,
  displayAllCommentOfIdea,
  createComment,
  deleteComment,
};
