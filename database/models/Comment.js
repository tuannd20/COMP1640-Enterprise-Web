const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    idStaffComment: { type: mongoose.Types.ObjectId, ref: "Staff" },
    idIdea: { type: mongoose.Types.ObjectId, ref: "Idea" },
    contentComment: String,
    isPublic: Boolean,
  },
  { timestamps: true },
);

CommentSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
