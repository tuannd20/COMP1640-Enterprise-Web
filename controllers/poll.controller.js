const PollService = require("../services/poll.service");

const getCreatePoll = async (req, res, next) => {
  res.render("partials/master", {
    title: "Poll Create",
    content: "../qam/poll/createpollpage",
  });
};

const createPoll = async (req, res, next) => {
  try {
    const formData = req.body;
    const name = req.body.namePoll;
    // Validation logic
    if (
      !formData.namePoll ||
      !formData.dateStart ||
      !formData.dateSubEnd ||
      !formData.dateEnd
    ) {
      return res.redirect("/qam/poll/create");
    }
    const checkDepartmentResit = await PollService.findByName(name);
    if (!checkDepartmentResit) {
      const Poll = await PollService.createPoll(formData);
      return res.redirect("/qam/poll");
    }
    return res.send(
      "<script>alert('Poll name is existed'); window.location.href='/qam/poll/create';</script>",
    );
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
    const namePollCurrent = poll.namePoll;
    const namePolls = await PollService.findByNameExist(namePollCurrent);
    console.log(
      "🚀 ~ file: poll.controller.js:55 ~ getEditPoll ~ Polls",
      namePolls,
    );

    return res.render("partials/master", {
      title: "Poll Edit",
      content: "../qam/poll/editPollPage",
      poll,
      namePolls,
    });
  } catch (err) {
    return err;
  }
};

const updatePoll = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  // const name = req.body.namePoll;
  try {
    const result = await PollService.updatePoll(
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

const getPollActivated = async (req, res) => {
  try {
    const Poll = await PollService.getPollActivated({});
    return res.json(Poll);
  } catch (err) {
    return err;
  }
};

const updatePollActivated = async (req, res) => {
  const { id } = req.params;
  try {
    const checkPoll = await PollService.getPoll({ _id: id });
    if (checkPoll.isUsed === false) {
      const Polls = await PollService.updatePoll({ _id: id }, { isUsed: true });
    }

    return res.redirect("/qam/poll");
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
  getPollActivated,
  updatePollActivated,
};
