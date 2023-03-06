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
  idStaffIdea: "6401748791e33ed5e38e4d7f",
  idPoll: "6401da2da4604c6d6ccdfac5",
  idDepartment: "6401f3e8a4604c6d6ccdfad6",
  idCategory: "64020d9db9f33b213f16e969",
  contentIdea: "Nhanh PO will invite all members go to eat chicken ++",
  urlFile: "https://wallpaper.dog/large/3372.jpg",
  likeCount: 0,
  disLikeCount: 0,
  viewCount: 0,
  status: "Private",
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
