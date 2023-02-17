const PollRepository = require("../repositories/poll.repository");

const createPoll = async (data) => {
  try {
    const result = await PollRepository.createPoll(data);
    return result;
  } catch (err) {
    return err;
  }
};

const getPoll = async (id) => {
  try {
    const result = await PollRepository.getPoll(id);
    return result;
  } catch (err) {
    return err;
  }
};

const getAllPoll = async () => {
  try {
    const result = await PollRepository.getAllPoll();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updatePoll = async (id, data) => {
  try {
    const result = await PollRepository.updatePoll(id, data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllPoll = async () => {
  try {
    const result = await PollRepository.deleteAllPoll();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOnePoll = async (id) => {
  try {
    const result = await PollRepository.deleteOnePoll(id);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getPollActivated = async () => {
  try {
    const result = await PollRepository.getPollActivated();
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
