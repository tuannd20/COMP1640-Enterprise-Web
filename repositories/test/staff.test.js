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
  it("Should create a new staff", async () => {
    const data = {
      fullName: "test full name Staff",
      gmail: "staff12332@gmail.com",
      password: "staff123",
      avatarImage: "avatar1",
      address: "abc123",
      phoneNumber: "012345678",
    };
    const staff = await StaffRepository.createStaff(data);
    console.log(staff);
  });
});
describe("Good case: Unit test for Staff", () => {
  it("Should update a staff", async () => {
    // eslint-disable-next-line no-underscore-dangle
    const id = "63e3ca5dc0d29c629db7895b";
    const data = {
      fullName: "test update full name Staff",
      gmail: "staff123@gmail.com",
      password: "staff123",
      avatarImage: "avatar111",
      address: "abc1234",
      phoneNumber: "012345678",
    };
    const staff = await StaffRepository.updateStaff(id, data);
    console.log(staff);
  });
});
describe("Good case: Unit test for Staff", () => {
  it("Should delete one staff", async () => {
    // eslint-disable-next-line no-underscore-dangle
    const id = "63e3ca5dc0d29c629db7895b";
    const staff = await StaffRepository.deleteOneStaff(id);
    console.log(staff);
  });
});
describe("Good case: Unit test for Staff", () => {
  it("Should delete all staff", async () => {
    // eslint-disable-next-line no-underscore-dangle
    const staff = await StaffRepository.deleteAllStaff();
    console.log(staff);
  });
});
