const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    idRole: String,
    idDepartment: String,
    nameStaff: String,
    gmail: String,
  },
  { timestamps: true },
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
