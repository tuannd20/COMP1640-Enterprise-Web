const PollService = require("../services/poll.service");

const createPoll = async (req, res) => {
  try {
    const result = await PollService.createPoll(req.body);

    return res.json("Poll page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllPoll = async (req, res, next) => {
  try {
    const result = await PollService.getAllPoll();
    console.log(
      "🚀 ~ file: poll.controller.js:17 ~ getAllPoll ~ result",
      result,
    );
    return res.json("Poll page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updatePoll = async (req, res, next) => {
  try {
    const result = await PollService.updatePoll(req.params.id, req.body);

    // eslint-disable-next-line no-undef
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOnePoll = async (req, res, next) => {
  try {
    const result = await PollService.deleteOnePoll(req.params.id);

    // eslint-disable-next-line no-undef
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllPoll = async (req, res, next) => {
  try {
    const result = await PollService.deleteAllPoll();

    // eslint-disable-next-line no-undef
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createPoll,
  deleteAllPoll,
  deleteOnePoll,
  updatePoll,
  getAllPoll,
};
