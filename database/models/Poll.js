const mongoose = require("mongoose");

const { Schema } = mongoose;

const PollSchema = new Schema(
  {
    namePoll: String,
    dateStart: Date,
    dateEnd: Date,
    dateSubEnd: Date,
    isUsed: {
      type: Boolean,
      default: false,
    },
    isHandleActionIdea: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
