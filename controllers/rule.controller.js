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
  res.render("partials/master", {
    title: "Create new terms",
    content: "../admin/terms/editTermsPage",
  });
};

const updateRule = async (req, res) => {
  try {
    const rule = await RuleService.updateRule(req.params.id, req.body);

    return res.json("Rule page");
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
};
