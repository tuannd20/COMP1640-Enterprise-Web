const mongoose = require("mongoose");
const DB = require("../../database/connection");

const staffIdeaService = require("../staffIdea.service");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Staff", () => {
  it("Should find staffIdea", async () => {
    const staff = await staffIdeaService.findOne({
      idStaff: "63f071cbb3d20cf76f8c153e",
      IdIdea: "63f0770e9b0c7469404f3c86",
    });
    console.log("🚀 ~ file: staffIdea.test.js:20 ~ it ~ staff:", staff);
  });
});
