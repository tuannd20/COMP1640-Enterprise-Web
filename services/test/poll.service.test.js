const mongoose = require("mongoose");
const DB = require("../../database/connection");

const PollService = require("../poll.service");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Staff", () => {
  it("Should find staffIdea", async () => {
    const poll = await PollService.checkPoll();
    console.log("🚀 ~ file: poll.service.test.js:17 ~ it ~ poll:", poll);
  });
});
