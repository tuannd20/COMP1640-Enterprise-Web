const PollService = require("../services/poll.service");

const getCreatePoll = async (req, res, next) => {
  res.render("partials/master", {
    title: "Poll Create",
    content: "../qam/poll/createpollpage",
  });
};

const createPoll = async (req, res, next) => {
  try {
    const Poll = await PollService.createPoll(req.body);
    return res.redirect("/qam/poll");
  } catch (err) {
    return err;
  }
};

const getAllPoll = async (req, res, next) => {
  try {
    const Polls = await PollService.getAllPoll();
    return res.render("partials/master", {
      title: "Poll List",
      content: "../qam/poll/listpollpage",
      Polls,
    });
  } catch (err) {
    return err;
  }
};

const getEditPoll = async (req, res, next) => {
  const { id } = req.params;
  try {
    const poll = await PollService.getPoll({ _id: id });

    return res.render("partials/master", {
      title: "Poll Edit",
      content: "../qam/poll/editPollPage",
      poll,
    });
  } catch (err) {
    return err;
  }
};

const updatePoll = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  try {
    const Polls = await PollService.updatePoll(
      { _id: id },
      { $set: updateObject },
    );
    return res.redirect("/qam/poll");
  } catch (err) {
    return err;
  }
};

const deleteOnePoll = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkPoll = await PollService.getPoll({
      _id: id,
    });
    if (checkPoll.isUsed == false) {
      const Polls = await PollService.deleteOnePoll({
        _id: id,
      });
      return res.redirect("/qam/poll");
    }
    return res.redirect("/qam/poll");
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
