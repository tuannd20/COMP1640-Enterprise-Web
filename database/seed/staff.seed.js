const mongoose = require("mongoose");
const StaffModel = require("../models/Staff");
const database = require("../connection");

const staffs = [
  new StaffModel({
    idRole: "63e5c62f619122bfbc78059f",
    idDepartment: "63e683191a7009d864c9adea",
    fullName: "Nguyen Van B",
    email: "accountStaff@gmail.com",
    password: "staff1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "092345232435",
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
