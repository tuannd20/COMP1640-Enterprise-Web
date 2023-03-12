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

const getPollInactive = async () => {
  try {
    const result = await PollRepository.getPollInactive();
    return result;
  } catch (err) {
    return err;
  }
};

const findByName = async (name) => {
  try {
    const result = await PollRepository.findByName(name);
    return result;
  } catch (err) {
    return err;
  }
};

const findByNameExist = async (id, name) => {
  try {
    const result = await PollRepository.findByNameExist(id, name);

    return result;
  } catch (err) {
    return err;
  }
};

const checkPoll = async () => {
  try {
    const currentDate = new Date();
    const condition = {
      dateStart: { $lte: currentDate },
      dateSubEnd: { $gt: currentDate },
    };
    const lastPoll = await PollRepository.lastPoll(condition);
    return lastPoll;
  } catch (error) {
    return error;
  }
};

const getPollNewest = async () => {
  try {
    const poll = await PollRepository.getPollNewest();

    return poll;
  } catch (error) {
    return error;
  }
};

const updateHandleActionIdea = async (id) => {
  try {
    const poll = await PollRepository.handleActionIdea(id);

    return poll;
  } catch (error) {
    return error;
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
  findByName,
  findByNameExist,
  getPollInactive,
  checkPoll,
  getPollNewest,
  updateHandleActionIdea,
};
