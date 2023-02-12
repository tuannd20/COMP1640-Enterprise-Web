const mongoose = require("mongoose");

const { Schema } = mongoose;

const PollSchema = new Schema(
  {
    namePoll: String,
    dateStart: Date,
    dateEnd: Date,
    dateTotal: Date,
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
