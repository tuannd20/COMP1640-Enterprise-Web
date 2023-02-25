const mongoose = require("mongoose");
const StaffModel = require("../models/Staff");
const database = require("../connection");

const staffs = [
  new StaffModel({
    idRole: "63f066f996329eb058cc3095",
    idDepartment: "63f069d3ebc00d7c6f011ee0",
    fullName: "Truong Quang Nhanh",
    email: "nhanhpo@gmail.com",
    password: "nhanhadminpo1234",
    avatarImage: null,
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
