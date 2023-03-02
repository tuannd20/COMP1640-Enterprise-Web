const mongoose = require("mongoose");
const DB = require("../../database/connection");

const staffIdeaRepository = require("../staffIdea.repository");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Staff", () => {
  it("Should find staffIdea", async () => {
    const staff = await staffIdeaRepository.findStaffIDea({
      idStaff: "63f071cbb3d20cf76f8c153e",
      IdIdea: "63f0770e9b0c7469404f3c86",
    });
    console.log("🚀 ~ file: staffIdea.test.js:20 ~ it ~ staff:", staff);
  });
  it("Should create staffIdea", async () => {
    const staff = await staffIdeaRepository.createStaffIDea({
      idStaff: "63f8de505636c2f259e33f6c",
      IdIdea: "63f0770e9b0c7469404f3c84",
      isLike: false,
      isView: false,
      __v: 0,
    });
    console.log("🚀 ~ file: staffIdea.test.js:20 ~ it ~ staff:", staff);
  });
});
