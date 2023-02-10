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

module.exports = {
  createComment,
};
