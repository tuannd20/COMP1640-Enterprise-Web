const CommentModel = require("../database/models/Comment");

const createComment = async (data) => {
  try {
    const comment = await CommentModel.create(data);

    return comment;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllComments = async () => {
  try {
    const comment = await CommentModel.find().populate([
      "idStaffComment",
      "idIdea",
    ]);

    const result = [];
    comment.map(
      // eslint-disable-next-line array-callback-return
      (item) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        result.push({
          id: item.id,
          staff: item.idStaffComment.id,
          idea: item.idIdea.id,
          content: item.contentComment,
          isPublic: item.isPublic,
        }),
      // eslint-disable-next-line function-paren-newline
    );

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllCommentsByIdIdea = async (id) => {
  try {
    const comment = await CommentModel.find({ idIdea: id }).populate({
      path: "idStaffComment",
      select: "fullName",
    });

    return comment;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteComment = async (id) => {
  try {
    const Idea = await CommentModel.delete({ _id: id });
    return Idea;
  } catch (err) {
    console.log(
      "🚀 ---------------------------------------------------------------🚀",
    );
    console.log(
      "🚀 ~ file: comment.repository.js:62 ~ deleteComment ~ err:",
      err,
    );
    console.log(
      "🚀 ---------------------------------------------------------------🚀",
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
