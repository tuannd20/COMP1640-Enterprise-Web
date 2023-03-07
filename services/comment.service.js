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

const createComment = async (data) => {
  try {
    console.log(
      "🚀 --------------------------------------------------------------🚀",
    );
    console.log(
      "🚀 ~ file: comment.service.js:28 ~ createComment ~ data:",
      data,
    );
    console.log(
      "🚀 --------------------------------------------------------------🚀",
    );
    const comments = await CommentRepository.createComment(data);

    return comments;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllComment,
  getAllCommentOfIdea,
  createComment,
};
