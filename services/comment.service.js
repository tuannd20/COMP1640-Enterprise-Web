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

const deleteComment = async (id) => {
  try {
    const result = await CommentRepository.deleteComment(id);
    console.log(
      "🚀 ----------------------------------------------------------🚀",
    );
    console.log("🚀 ~ file: comment.service.js:49 ~ deleteComment ~ id:", id);
    console.log(
      "🚀 ----------------------------------------------------------🚀",
    );
    return result;
  } catch (err) {
    console.log(
      "🚀 ------------------------------------------------------------🚀",
    );
    console.log("🚀 ~ file: comment.service.js:51 ~ deleteComment ~ err:", err);
    console.log(
      "🚀 ------------------------------------------------------------🚀",
    );
    return err;
  }
};

module.exports = {
  getAllComment,
  getAllCommentOfIdea,
  createComment,
  deleteComment,
};
