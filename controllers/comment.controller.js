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

module.exports = {
  displayAllComment,
  displayAllCommentOfIdea,
};
