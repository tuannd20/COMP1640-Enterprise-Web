const express = require("express");

const router = express.Router();
/* GET home page. */
router.get("/", (req, res) => {
  res.render("homeStaff", { title: "Express" });
});
router.get("/edit", (req, res) => {
  res.render("editIdea", { title: "Express" });
});
router.get("/profile", (req, res) => {
  res.render("profileStaff", { title: "Express" });
});
router.get("/create", (req, res) => {
  res.render("createIdea");
});

module.exports = router;
