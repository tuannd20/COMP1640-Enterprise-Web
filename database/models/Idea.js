const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { DRAFT, PRIVATE, PUBLIC } = require("../../constants/status");

const { Schema } = mongoose;

const IdeaSchema = new Schema(
  {
    idStaffIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    idPoll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
    },
    idDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    contentIdea: String,
    urlFile: String,
    likeCount: Number,
    disLikeCount: Number,
    viewCount: Number,
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
