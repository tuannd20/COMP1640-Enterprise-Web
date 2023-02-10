const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("home/homeStaff");
});
router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
