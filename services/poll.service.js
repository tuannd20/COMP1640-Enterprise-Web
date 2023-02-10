const PollRepository = require("../repositories/poll.repository");

const createPoll = async (req, res) => {
  try {
    const result = await PollRepository.createPoll(req.body);
    return result;
  } catch (err) {
    console.log(err);
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

const updatePoll = async (req, res) => {
  try {
    const result = await PollRepository.updatePoll(req.params.id, req.body);
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

module.exports = {
  createPoll,
  getAllPoll,
  updatePoll,
  deleteAllPoll,
  deleteOnePoll,
};
