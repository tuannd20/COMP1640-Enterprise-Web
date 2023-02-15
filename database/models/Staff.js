const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    idRole: { type: mongoose.Types.ObjectId, ref: "Role" },
    idDepartment: { type: mongoose.Types.ObjectId, ref: "Department" },
    fullName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    avatarImage: String,
    address: String,
    phoneNumber: String,
    lockAccount: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
