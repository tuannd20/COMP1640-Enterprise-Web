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

module.exports = {
  getAllComment,
  getAllCommentOfIdea,
};
