const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("home", { title: "Express" });
});

module.exports = router;
