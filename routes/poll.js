const express = require("express");

const router = express.Router();
const PollController = require("../controllers/poll.controller");

// [GET] create Poll
router.get("/create", PollController.getCreatePoll);

// [POST] create Poll
router.post("/create", PollController.createPoll);

// [GET] edit Poll
router.get("/edit/:id", PollController.getEditPoll);

// [PUT] update Poll
router.put("/edit/:id", PollController.updatePoll);

// [DELETE] delete Poll
router.delete("/delete/:id", PollController.deleteOnePoll);

// [DELETE] delete Poll
router.delete("/delete-all", PollController.deleteAllPoll);

// [GET] all Poll
router.get("/", PollController.getAllPoll);

module.exports = router;
