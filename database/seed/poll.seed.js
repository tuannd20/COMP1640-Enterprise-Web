const mongoose = require("mongoose");
const PollModel = require("../models/Poll");
const database = require("../connection");

const poll = [
  new PollModel({
    namePoll: "PO Good Job",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    dateSubEnd: Date.now(),
    isUsed: false,
  }),
  new PollModel({
    namePoll: "Members Good Job",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    dateSubEnd: Date.now(),
    isUsed: false,
  }),
];

(async () => {
  await database.connectionDatabase();
})();

poll.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  data.save((_err, result) => {
    if (index === poll.length) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
