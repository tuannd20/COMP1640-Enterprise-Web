const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    idDepartment: { type: mongoose.Types.ObjectId, ref: "Department" },
    nameCategory: String,
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
