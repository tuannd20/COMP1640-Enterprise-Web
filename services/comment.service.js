const CommentRepository = require("../repositories/comment.repository");

const getAllComment = async () => {
  try {
    const comments = await CommentRepository.getAllComments();

    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllCommentOfIdea = async (id) => {
  try {
    const comments = await CommentRepository.getAllCommentsByIdIdea(id);

    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const readAllCommentsByIdIdea = async (id) => {
  try {
    const comments = await CommentRepository.readAllCommentsByIdIdea(id);

    return comments;
  } catch (error) {
    console.error(
      "🚀 ~ file: comment.service.js:31 ~ readAllCommentsByIdIdea ~ error:",
      error,
    );
    return error;
  }
};

module.exports = {
  getAllComment,
  getAllCommentOfIdea,
  readAllCommentsByIdIdea,
};
