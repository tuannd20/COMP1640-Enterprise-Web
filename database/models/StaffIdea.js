const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaffIdeaSchema = new Schema(
  {
    idStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    IdIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
    },
    isLike: {
      type: Boolean,
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const StaffIdea = mongoose.model("StaffIdea", StaffIdeaSchema);

module.exports = StaffIdea;
