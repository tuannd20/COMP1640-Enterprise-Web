const mongoose = require("mongoose");

const { Schema } = mongoose;

const IdeaSchema = new Schema({
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
  timeUpload: String,
  likeCount: Number,
  disLikeCount: Number,
  viewCount: Number,
  status: String,
});

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;
