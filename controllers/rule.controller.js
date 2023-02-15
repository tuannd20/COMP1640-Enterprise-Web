const RuleService = require("../services/rule.service");

const createRule = async (req, res) => {
  try {
    const rule = await RuleService.createRule(req.body);

    return res.render("partials/master", {
      title: "Create new account",
      content: "../admin/terms/createTermsPage",
      rule,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const renderCreateTermsPage = async (req, res) => {
  res.render("partials/master", {
    title: "Create new terms",
    content: "../admin/terms/createTermsPage",
  });
};

const renderEditTermsPage = async (req, res) => {
  const { id } = req.params;
  const term = await RuleService.displayRuleById({ _id: id });
  try {
    return res.render("partials/master", {
      title: "Edit term",
      content: "../admin/terms/editTermsPage",
      term,
    });
  } catch (err) {
    return err;
  }
};

const updateRule = async (req, res) => {
  const { id } = req.params;
  const updateObject = req.body;
  try {
    const rule = await RuleService.updateRule(
      { _id: id },
      { $set: updateObject },
    );
    return res.redirect("/admin/terms");
  } catch (err) {
    return err;
  }
};

const displayTermById = async (req, res) => {
  const { id } = req.params;
  try {
    const rule = await RuleService.displayTermById({ _id: id });

    return res.render("partials/master", {
      title: "Edit Term",
      content: "../admin/terms/editTermsPage",
      rule,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteOneRule = async (req, res) => {
  try {
    const rule = await RuleService.deleteOneRule(req.params.id);

    return res.json("Rule page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllRule = async (req, res) => {
  try {
    const rule = await RuleService.deleteAllRule();

    return res.json("Rule page");
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllRule = async (req, res) => {
  try {
    const rules = await RuleService.getAllRule();
    return res.render("partials/master", {
      title: "List of terms",
      content: "../admin/terms/listTermsPage",
      rules,
    });
    // return res.json(rules);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRule,
  updateRule,
  renderCreateTermsPage,
  renderEditTermsPage,
  deleteOneRule,
  getAllRule,
  deleteAllRule,
  displayTermById,
};
