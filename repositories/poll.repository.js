const PollModel = require("../database/models/Poll");

const createPoll = async (data) => {
  try {
    const Poll = await PollModel.create(data);

    return Poll;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllPoll = async () => {
  try {
    const result = await PollModel.find();

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getPoll = async (id) => {
  try {
    const result = await PollModel.findById(id);

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updatePoll = async (id, data) => {
  try {
    const Poll = await PollModel.updateMany(id, data);
    return Poll;
  } catch (err) {
    return err;
  }
};

const deleteOnePoll = async (id) => {
  try {
    const result = await PollModel.findOneAndRemove(id);
    return result;
  } catch (err) {
    return err;
  }
};

const deleteAllPoll = async () => {
  try {
    const result = await PollModel.deleteMany({ isUsed: false });
    return result;
  } catch (err) {
    return err;
  }
};

const getPollActivated = async () => {
  try {
    const result = await PollModel.find({ isUsed: true });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createPoll,
  getAllPoll,
  updatePoll,
  deleteAllPoll,
  deleteOnePoll,
  getPoll,
  getPollActivated,
};
