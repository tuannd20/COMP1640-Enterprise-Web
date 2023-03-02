const mongoose = require("mongoose");
const DB = require("../../database/connection");
const Staff = require("../../database/models/Staff");

const ideaRepository = require("../idea.repository");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

const mockIdea = {
  idStaffIdea: "63f0718f5fd3e1c2d3f75f72",
  idPoll: "63f06f1a73af73fb75984dd7",
  idDepartment: "63f069d3ebc00d7c6f011edd",
  idCategory: "63f06bfda21296c767a69cac",
  contentIdea: "Nhanh PO will invite all members go to eat chicken ++",
  urlFile: "https://wallpaper.dog/large/3372.jpg",
  likeCount: 0,
  disLikeCount: 0,
  viewCount: 0,
  status: "Draft",
};

describe("Good case: Unit test for idea", () => {
  it("Should create a new idea", async () => {
    const idea = await ideaRepository.createIdea(mockIdea);
    console.log("🚀 ~ file: idea.test.js:31 ~ it ~ idea", idea);
    // expect(idea.contentIdea).toEqual(mockIdea.contentIdea);
    // expect(idea.likeCount).toEqual(mockIdea.likeCount);
    // expect(idea.disLikeCount).toEqual(mockIdea.disLikeCount);
    // expect(idea.viewCount).toEqual(mockIdea.viewCount);
    // expect(idea.status).toEqual(mockIdea.status);
    // const ideaId = idea._id;
    // console.log("🚀 ~ file: idea.test.js:39 ~ it ~ ideaId", ideaId);
    // await ideaRepository.deleteIdea(ideaId);
  });
  // it("Should read a idea", async () => {
  //   const idea = await ideaRepository.readIdea("63f071cbb3d20cf76f8c153d");
  //   console.log("🚀 ~ file: idea.test.js:43 ~ it ~ idea:", idea);
  // });
  // it("Should update a idea", async () => {
  //   const idea = await ideaRepository.updateIdea(
  //     "63f0722f250404b4694b7045",
  //     mockIdea,
  //   );
  //   expect(idea.contentIdea).toEqual(mockIdea.contentIdea);
  //   expect(idea.likeCount).toEqual(mockIdea.likeCount);
  //   expect(idea.disLikeCount).toEqual(mockIdea.disLikeCount);
  //   expect(idea.viewCount).toEqual(mockIdea.viewCount);
  //   expect(idea.status).toEqual(mockIdea.status);
  // });
  // it("Should read a idea", async () => {
  //   const page = 1;
  //   const limit = 5;
  //   const options = {
  //     page,
  //     limit,
  //     populate: { path: "idStaffIdea", model: Staff },
  //     sort: { createdAt: -1 },
  //   };
  //   const idea = await ideaRepository.getAll(options);
  //   console.log("🚀 ~ file: idea.test.js:70 ~ it ~ idea", idea);
  // });
});
