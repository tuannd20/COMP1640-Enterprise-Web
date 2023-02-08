const mongoose = require("mongoose");

const { Schema } = mongoose;

const IdeaSchema = new Schema({
  IDStaffIdea: {
    type: mongoose.Schema.Types.ObjectId,
  },
  idPoll: {
    type: mongoose.Schema.Types.ObjectId,
  },
  idDepartment: {
    type: mongoose.Schema.Types.ObjectId,
  },
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
  },
  contentIdea: String,
  urlFile: String,
  timeUpload: String,
  likeCount: Number,
  disLikeCount: Number,
  viewCount: Number,
  public: Boolean,
});

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;
