const mongoose = require("mongoose");
const DB = require("../../database/connection");

const ideaRepository = require("../idea.repository");

beforeEach(async () => {
  await DB.connectionDatabase();
});

afterEach(async () => {
  await mongoose.connection.close();
});

const mockIdea = {
  idStaffIdea: "62afd6301880d15172727cc8",
  idPoll: "62afd6301880d15172727cc8",
  idDepartment: "62afd6301880d15172727cc8",
  idCategory: "62afd6301880d15172727cc8",
  contentIdea: "Test",
  urlFile: "testing",
  timeUpload: "12/2/2323",
  likeCount: 5,
  disLikeCount: 1,
  viewCount: 10,
  status: "Draft",
};

describe("Good case: Unit test for idea", () => {
  // it("Should create a new idea", async () => {
  //   const idea = await ideaRepository.createIdea(mockIdea);
  //   expect(idea.contentIdea).toEqual(mockIdea.contentIdea);
  //   expect(idea.urlFile).toEqual(mockIdea.urlFile);
  //   expect(idea.timeUpload).toEqual(mockIdea.timeUpload);
  //   expect(idea.likeCount).toEqual(mockIdea.likeCount);
  //   expect(idea.disLikeCount).toEqual(mockIdea.disLikeCount);
  //   expect(idea.viewCount).toEqual(mockIdea.viewCount);
  //   expect(idea.status).toEqual(mockIdea.status);
  //   const ideaId = idea._id;
  //   console.log("🚀 ~ file: idea.test.js:39 ~ it ~ ideaId", ideaId);
  //   await ideaRepository.deleteIdea(ideaId);
  // });
  it("Should read a idea", async () => {
    const idea = await ideaRepository.readIdea("63e4f08f2c9171793d40f181");
    expect(idea.contentIdea).toEqual(mockIdea.contentIdea);
    expect(idea.urlFile).toEqual(mockIdea.urlFile);
    expect(idea.timeUpload).toEqual(mockIdea.timeUpload);
    expect(idea.likeCount).toEqual(mockIdea.likeCount);
    expect(idea.disLikeCount).toEqual(mockIdea.disLikeCount);
    expect(idea.viewCount).toEqual(mockIdea.viewCount);
    expect(idea.status).toEqual(mockIdea.status);
  });
  it("Should update a idea", async () => {
    const idea = await ideaRepository.updateIdea(
      "63e4f08f2c9171793d40f181",
      mockIdea,
    );
    expect(idea.contentIdea).toEqual(mockIdea.contentIdea);
    expect(idea.urlFile).toEqual(mockIdea.urlFile);
    expect(idea.timeUpload).toEqual(mockIdea.timeUpload);
    expect(idea.likeCount).toEqual(mockIdea.likeCount);
    expect(idea.disLikeCount).toEqual(mockIdea.disLikeCount);
    expect(idea.viewCount).toEqual(mockIdea.viewCount);
    expect(idea.status).toEqual(mockIdea.status);
  });
});
