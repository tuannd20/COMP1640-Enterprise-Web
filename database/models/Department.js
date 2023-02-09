const mongoose = require("mongoose");

const { Schema } = mongoose;

const DepartmentSchema = new Schema(
  {
    nameDepartment: String,
    description: String,
    isUsed: Boolean,
  },
  { timestamps: true },
);

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
