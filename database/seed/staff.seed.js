const mongoose = require("mongoose");
const StaffModel = require("../models/Staff");
const database = require("../connection");

const staffs = [
  new StaffModel({
    idRole: "63f069093057672cba67eb4a",
    idDepartment: "63f069d3ebc00d7c6f011edd",
    fullName: "Truong Quang Nhanh",
    email: "nhanhpo@gmail.com",
    password: "nhanhadminpo1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4a",
    idDepartment: "63f069d3ebc00d7c6f011ee0",
    fullName: "Phan Quoc Hieu",
    email: "hieupro@gmail.com",
    password: "hieupro1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4b",
    idDepartment: "63f069d3ebc00d7c6f011edf",
    fullName: "Phan Le Chinh Nhan",
    email: "nhanpro@gmail.com",
    password: "nhanpro1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4b",
    idDepartment: "63f069d3ebc00d7c6f011edf",
    fullName: "Le Phuong Trung",
    email: "trungpro@gmail.com",
    password: "trungpro1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4b",
    idDepartment: "63f069d3ebc00d7c6f011ee1",
    fullName: "Do Ngoc Duyen",
    email: "duyenpro@gmail.com",
    password: "duyenpro1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f066f996329eb058cc3096",
    idDepartment: "63f069d3ebc00d7c6f011edf",
    fullName: "Nguyen Tam Phuc",
    email: "phucpro@gmail.com",
    password: "phucpro1234",
    avatarImage: "avatar0003",
    address: "Danang city",
    phoneNumber: "0123456789",
    lockAccount: false,
  }),
  new StaffModel({
    idRole: "63f069093057672cba67eb4b",
    idDepartment: "63f069d3ebc00d7c6f011ee0",
    fullName: "Nguyen Duy Tuan",
    email: "tuanpro@gmail.com",
    password: "tuanpro1234",
    avatarImage: "avatar0003",
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
