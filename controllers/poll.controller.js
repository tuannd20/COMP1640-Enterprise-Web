const PollService = require("../services/poll.service");

const getCreatePoll = async (req, res, next) => {
  res.render("Poll/create");
};

const createPoll = async (req, res, next) => {
  try {
    const Poll = await PollService.createPoll(req.body);
    return res.json(Poll);
  } catch (err) {
    return err;
  }
};

const getAllPoll = async (req, res, next) => {
  try {
    const Polls = await PollService.getAllPoll();
    return res.json(Polls);
  } catch (err) {
    return err;
  }
};

const getEditPoll = async (req, res, next) => {
  res.render("Poll/edit");
};

const updatePoll = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  try {
    const Polls = await PollService.updatePoll(
      { _id: id },
      { $set: updateObject },
    );
    return res.json(Polls);
  } catch (err) {
    return err;
  }
};

const deleteOnePoll = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Polls = await PollService.deleteOnePoll({
      _id: id,
    });
    return res.json(Polls);
  } catch (err) {
    return err;
  }
};

const deleteAllPoll = async (req, res, next) => {
  try {
    const Polls = await PollService.deleteAllPoll();
    return res.json(Polls);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getCreatePoll,
  createPoll,
  deleteAllPoll,
  deleteOnePoll,
  getEditPoll,
  updatePoll,
  getAllPoll,
};
