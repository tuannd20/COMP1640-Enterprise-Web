const PollService = require("../services/poll.service");
const PollModel = require("../database/models/Poll");

const getCreatePoll = async (req, res, next) => {
  res.render("partials/master", {
    title: "Create new Poll",
    content: "../qam/poll/createPollPage",
    errorMessage: null,
    isFailed: false,
  });
};

const createPoll = async (req, res, next) => {
  try {
    const formData = req.body;
    const { namePoll } = req.body;
    const { dateSubEnd, dateEnd, dateStart } = req.body;

    const checkDepartmentResit = await PollService.findByName(namePoll);
    if (!checkDepartmentResit) {
      const Poll = await PollService.createPoll(formData);
      return res.redirect("/qam/poll");
    }
    const errorPoll = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new Poll",
      content: "../qam/poll/createPollPage",
      errorMessage: errorPoll,
      code: errorCode,
      isFailed: true,
      namePoll,
      dateStart,
      dateSubEnd,
      dateEnd,
    });
  } catch (err) {
    return err;
  }
};

const getAllPoll = async (req, res, next) => {
  try {
    const staff = req.cookies.Staff;

    const Polls = await PollService.getAllPoll();
    const lastPoll = await PollModel.findOne().sort({ dateSubEnd: -1 });
    if (!lastPoll) {
      console.log(
        "🚀 ~ file: poll.controller.js:48 ~ getAllPoll ~ lastPoll:",
        lastPoll,
      );
    }

    return res.render("partials/master", {
      title: "Poll List",
      content: "../qam/poll/listpollpage",
      Polls,
      staff,
      role: staff.idRole.nameRole,
      lastPoll,
    });
  } catch (err) {
    return err;
  }
};

const getEditPoll = async (req, res, next) => {
  const { id } = req.params;

  try {
    const poll = await PollService.getPoll({ _id: id });

    const pollDateStart = poll.dateStart;
    console.log(
      "🚀 ~ file: poll.controller.js:62 ~ getEditPoll ~ pollDateStart:",
      pollDateStart,
    );

    return res.render("partials/master", {
      title: "Poll Edit",
      content: "../qam/poll/editPollPage",
      poll,
      pollDateStart,
      errorMessage: null,
      isFailed: false,
    });
  } catch (err) {
    return err;
  }
};

const updatePoll = async (req, res, next) => {
  const { id } = req.params;
  const updateObject = req.body;
  const { namePoll } = req.body;
  const { dateSubEnd, dateEnd, dateStart } = req.body;
  // const name = req.body.namePoll;
  try {
    const namePolls = await PollService.findByNameExist(id, namePoll);
    if (namePolls.length === 0) {
      const result = await PollService.updatePoll(
        { _id: id },
        { $set: updateObject },
      );
      return res.redirect("/qam/poll");
    }
    const errorPoll = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new Poll",
      content: "../qam/poll/createPollPage",
      errorMessage: errorPoll,
      code: errorCode,
      isFailed: true,
      namePoll,
      dateStart,
      dateSubEnd,
      dateEnd,
    });
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

const getPollInactive = async (req, res) => {
  try {
    const Poll = await PollService.getPollInactive({});
    return res.json(Poll);
  } catch (err) {
    return err;
  }
};

const updatePollActive = async (req, res) => {
  const { id } = req.params;
  try {
    const checkPoll = await PollService.getPoll({ _id: id });
    if (checkPoll.isUsed === false) {
      const Polls = await PollService.updatePoll({ _id: id }, { isUsed: true });
      return res.json(Polls);
    }
    return res.send("this poll is used");
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
  updatePollActive,
  getPollInactive,
};
