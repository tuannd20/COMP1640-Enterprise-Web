const CommentService = require("../services/comment.service");

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
    const { comment, idIdea } = req.body;
    if (!comment || !idIdea) return res.redirect("/errors");

    const comments = await CommentService.createComment({
      idIdea,
      idStaffComment,
      contentComment: comment,
    });

    return res.send(comments);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  displayAllComment,
  displayAllCommentOfIdea,
  createComment,
};
