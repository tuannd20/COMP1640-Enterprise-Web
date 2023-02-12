const PollModel = require("../database/models/Poll");

const createPoll = async (data) => {
  try {
    const department = await PollModel.create(data);

    return department;
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

const updatePoll = async (id, data) => {
  try {
    const department = await PollModel.updateMany(id, data);
    return department;
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
    const result = await PollModel.deleteMany({});
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
};
