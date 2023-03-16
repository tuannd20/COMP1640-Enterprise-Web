const mongoose = require("mongoose");
const CommentRepository = require("../comments.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Role", () => {
  it("Should create a new role", async () => {
    const data = {
      idStaffComment: "63e4961925e412365c00a08a",
      idIdea: "63e4961925e412365c00a08a",
      contentComment: "Comment for good idea",
      isPublic: false,
    };
    const comment = await CommentRepository.createComment(data);
    console.log(comment);
  });
});
