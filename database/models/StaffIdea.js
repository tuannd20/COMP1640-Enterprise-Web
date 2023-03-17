const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

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

StaffIdeaSchema.plugin(paginate);
const StaffIdea = mongoose.model("StaffIdea", StaffIdeaSchema);

module.exports = StaffIdea;
