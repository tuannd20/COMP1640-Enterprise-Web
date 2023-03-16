/* eslint-disable object-curly-newline */
const CommentModel = require("../database/models/Comment");

const createComment = async (data) => {
  try {
    const comment = await CommentModel.create(data);
    return comment;
  } catch (err) {
    console.error(
      "🚀 ~ file: comments.repository.js:8 ~ createComment ~ err:",
      err,
    );
    return err;
  }
};

const getAllComments = async () => {
  try {
    const comments = await CommentModel.find().populate([
      "idStaffComment",
      "idIdea",
    ]);

    const results = comments.map((comment) => {
      const { id, idStaffComment, idIdea, contentComment, isPublic } = comment;
      return {
        id,
        staff: idStaffComment.id,
        idea: idIdea.id,
        content: contentComment,
        isPublic,
      };
    });

    return results;
  } catch (error) {
    console.error(
      "🚀 ~ file: comments.repository.js:37 ~ getAllComments ~ error:",
      error,
    );
    return error;
  }
};

const getAllCommentsByIdIdea = async (id) => {
  try {
    const comment = await CommentModel.find({ idIdea: id }).populate({
      path: "idStaffComment",
      select: "fullName avatarImage",
    });

    return comment;
  } catch (error) {
    console.error(
      "🚀 ~ file: comments.repository.js:54 ~ getAllCommentsByIdIdea ~ error:",
      error,
    );
    return error;
  }
};

const deleteComment = async (id) => {
  try {
    const Idea = await CommentModel.delete({ _id: id });
    return Idea;
  } catch (err) {
    console.error(
      "🚀 ~ file: comments.repository.js:67 ~ deleteComment ~ err:",
      err,
    );
    return err;
  }
};

module.exports = {
  createComment,
  getAllComments,
  getAllCommentsByIdIdea,
  deleteComment,
};
