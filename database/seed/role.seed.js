const mongoose = require("mongoose");
const RoleModel = require("../models/Role");
const database = require("../connection");

const roles = [
  new RoleModel({
    roleName: "admin",
    description: "can do every thing with role",
  }),
  new RoleModel({
    roleName: "QA",
    description: "this description for role",
  }),
];

(async () => {
  await database.connectionDatabase();
})();

roles.map(async (data, index) => {
  await data.save((err, result) => {
    if (index === roles.length - 1) {
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
