const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const PollRepository = require("../poll.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const mockPoll = {
  _id: "63e4961925e412365c00a08a",
  namePoll: "first Year Test",
  dateStart: "2023-02-09T06:43:37.925+00:00",
  dateEnd: "2023-02-09T06:43:37.925+00:00",
  dateTotal: "2023-02-09T06:43:37.925+00:00",
};

describe("Good case: Unit test for Poll", () => {
  // it("Should create a new poll", async () => {
  //   const data = {
  //     namePoll: "first Year Test 1",
  //     dateStart: "2023-02-09T06:43:37.925+00:00",
  //     dateEnd: "2023-02-09T06:43:37.925+00:00",
  //     dateTotal: "2023-02-09T06:43:37.925+00:00",
  //   };
  //   const poll = await PollRepository.createPoll(data);
  //   console.log(poll);
  // });

  // it("Should read all poll", async () => {
  //   const result = await PollRepository.getAllPoll();
  //   console.log(result);
  // });

  // it("Should update a new poll", async () => {
  //   const data = {
  //     namePoll: "first Year updated",
  //     dateStart: "2023-02-09T06:43:37.925+00:00",
  //     dateEnd: "2023-02-09T06:43:37.925+00:00",
  //     dateTotal: "2023-02-09T06:43:37.925+00:00",
  //   };
  //   const id = "63e52ed1eb2ce435a37feab4";
  //   const result = await PollRepository.updatePoll(id, data);
  //   console.log(result);
  // });

  // it("Should delete one poll", async () => {
  //   const id = "63e52ed1eb2ce435a37feab4";
  //   const result = await PollRepository.deleteOnePoll(id);
  //   console.log(result);
  // });

  // it("Should delete all poll", async () => {
  //   const result = await PollRepository.deleteAllPoll();
  //   console.log(result);
  // });

  // it("Should delete one poll", async () => {
  //   const id = "63e90454d2f534b017aec369";
  //   const result = await PollRepository.getPoll(id);
  //   console.log(result);
  // });
  it("Should find last one poll", async () => {
    const result = await PollRepository.checkPoll();
    console.log(result);
  });
});
