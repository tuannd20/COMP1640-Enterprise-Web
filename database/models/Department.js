const mongoose = require("mongoose");

const { Schema } = mongoose;

const DepartmentSchema = new Schema(
  {
    nameDepartment: String,
    description: String,
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
