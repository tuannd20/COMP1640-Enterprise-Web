const mongoose = require("mongoose");
const CommentModel = require("../models/Comment");
const database = require("../connection");

const comments = [
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153e",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Nhan comment la Nhanh Moi team di an ga nhanh len",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153e",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Nhan comment la Nhanh Moi team di an ga nhanh len",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c1540",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Go to eat chicken PO oi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c1541",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Go to eat chicken PO oi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c1541",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Go to eat chicken PO oi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153d",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Di an chicken nhanh len nao, team minh lam het suc roi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153d",
    idIdea: "63f069d3ebc00d7c6f011ede",
    contentComment: "Di an chicken nhanh len nao, team minh lam het suc roi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153f",
    idIdea: "63f069d3ebc00d7c6f011ede",
    contentComment: "Di an chicken nhanh len nao, team minh lam het suc roi",
    isPublic: true,
  }),
  new CommentModel({
    idStaffComment: "63f071cbb3d20cf76f8c153f",
    idIdea: "63f07f3354c28afb872cca5d",
    contentComment: "Di an chicken nhanh len nao, team minh lam het suc roi",
    isPublic: true,
  }),
];

(async () => {
  await database.connectionDatabase();
})();

comments.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === comments.length) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
