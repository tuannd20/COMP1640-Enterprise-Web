const mongoose = require("mongoose");
const StaffModel = require("../models/Staff");
const database = require("../connection");

const staffs = [
  new StaffModel({
    idRole: "63f066f996329eb058cc3096",
    fullName: "Phan Le Chinh Nhan",
    email: "nhanchinhpro@gmail.com",
    password: "Abc123",
    avatarImage: "",
    address: "Danang city",
    phoneNumber: "0985664795",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4a",
    fullName: "Truong Quang Nhanh",
    email: "nhanhpo@gmail.com",
    password: "Abc123",
    avatarImage: "",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
];

(async () => {
  await database.connectionDatabase();
})();

staffs.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === staffs.length - 1) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
