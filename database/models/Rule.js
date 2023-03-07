const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const mongooseDelete = require("mongoose-delete");

const { Schema } = mongoose;

const RuleSchema = new Schema(
  {
    title: String,
    contentRule: String,
  },
  { timestamps: true },
);
RuleSchema.plugin(paginate);
RuleSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
const Rule = mongoose.model("Rule", RuleSchema);

module.exports = Rule;
