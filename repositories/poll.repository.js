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
    const department = await PollModel.findOneAndUpdate(id, data);
    console.log(department);
  } catch (err) {
    console.error(err);
  }
};

const deleteOnePoll = async (id) => {
  try {
    const result = await PollModel.findOneAndRemove(id);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteAllPoll = async () => {
  try {
    const result = await PollModel.deleteMany({});
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createPoll,
  getAllPoll,
  updatePoll,
  deleteAllPoll,
  deleteOnePoll,
};
