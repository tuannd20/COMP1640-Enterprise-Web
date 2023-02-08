const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    idDepartment: String,
    nameDepartment: String,
    uesd: Boolean,
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
