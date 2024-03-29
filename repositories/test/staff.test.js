const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const StaffRepository = require("../staff.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Staff", () => {
  it("Should find staff", async () => {
    const find = await StaffRepository.findLeader({
      idRole: "63f066f996329eb058cc3095",
      idDepartment: "63f069d3ebc00d7c6f011ee0",
    });
    console.log("🚀 ~ file: staff.test.js:17 ~ it ~ find:", find);
  });
  it("Should create a new staff", async () => {
    // eslint-disable-next-line camelcase
    const id_Department = "63e9aa122b4cc9ab8e700951";
    // eslint-disable-next-line camelcase
    const id_Role = "63e5c62f619122bfbc78059f";
    const data = {
      // eslint-disable-next-line camelcase
      idDepartment: id_Department,
      // eslint-disable-next-line camelcase
      idRole: id_Role,
      fullName: "test full name Staff",
      email: "staff12332@gmail.com",
      password: "staff123",
      avatarImage: "avatar1",
      address: "abc123",
      phoneNumber: "012345678",
    };
    const staff = await StaffRepository.createStaff(data);
    console.log(staff);
  });
});
// describe("Good case: Unit test for Staff", () => {
//   it("Should update a staff", async () => {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = "63e3ca5dc0d29c629db7895b";
//     const data = {
//       fullName: "test update full name Staff",
//       email: "staff11111111@gmail.com",
//       password: "staff123",
//       avatarImage: "avatar111",
//       address: "abc1234",
//       phoneNumber: "012345678",
//     };
//     const staff = await StaffRepository.updateStaff(id, data);
//     console.log(staff);
//   });
// });
// describe("Good case: Unit test for Staff", () => {
//   it("Should delete one staff", async () => {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = "63e3ca5dc0d29c629db7895b";
//     const staff = await StaffRepository.deleteOneStaff(id);
//     console.log(staff);
//   });
// });
// describe("Good case: Unit test for Staff", () => {
//   it("Should delete all staff", async () => {
//     // eslint-disable-next-line no-underscore-dangle
//     const staff = await StaffRepository.deleteAllStaff();
//     console.log(staff);
//   });
// });
