const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaffSchema = new Schema(
  {
    idRole: { type: mongoose.Types.ObjectId, ref: "Role" },
    idDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      default: null,
    },
    cloudinary_id: {
      type: String,
      default: "",
    },
    address: String,
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    lockAccount: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
