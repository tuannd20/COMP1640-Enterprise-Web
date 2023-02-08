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
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === roles.length - 1) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
