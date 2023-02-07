const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    idStaffComment: String,
    idIdeal: String,
    contentComment: String,
    public: Boolean,
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
