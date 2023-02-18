const mongoose = require("mongoose");
const DepartmentModel = require("../models/Department");
const database = require("../connection");

const departments = [
  new DepartmentModel({
    nameDepartment: "IT",
    description: "IT of University",
    isUsed: true,
  }),
  new DepartmentModel({
    nameDepartment: "English",
    description: "English class of University",
    isUsed: true,
  }),
  new DepartmentModel({
    nameDepartment: "Design",
    description: "Design class of University",
    isUsed: true,
  }),
  new DepartmentModel({
    nameDepartment: "Student Support",
    description: "Student Support Department of University",
    isUsed: true,
  }),
  new DepartmentModel({
    nameDepartment: "Accounting",
    description: "Accounting Department of University",
    isUsed: true,
  }),
];

(async () => {
  await database.connectionDatabase();
})();

departments.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === departments.length - 6) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
