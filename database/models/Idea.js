const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { DRAFT, PRIVATE, PUBLIC } = require("../../constants/status");

const { Schema } = mongoose;

const IdeaSchema = new Schema(
  {
    idStaffIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      require: true,
    },
    idPoll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      require: true,
    },
    idDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      require: true,
    },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    contentIdea: { type: String, require: true },
    urlFile: { type: String, default: null },
    likeCount: { type: Number, default: 0 },
    disLikeCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: [DRAFT, PRIVATE, PUBLIC],
      default: DRAFT,
    },
  },
  { timestamps: true },
);

IdeaSchema.plugin(paginate);
const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;
