const mongoose = require("mongoose");

const { Schema } = mongoose;

const RuleSchema = new Schema(
  {
    title: String,
    contentRule: String,
  },
  { timestamps: true },
);

const Rule = mongoose.model("Rule", RuleSchema);

module.exports = Rule;
