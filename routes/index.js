const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("editIdea", { title: "Express" });
});

module.exports = router;
