const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    nameRole: String,
    description: String,
  },
  { timestamps: true },
);

const Role = mongoose.model("Account", RoleSchema);

module.exports = Role;
