const RuleService = require("../services/rule.service");

const createRule = async (req, res) => {
  try {
    const rule = await RuleService.createRule(req.body);

    return res.json("Rule page");
  } catch (err) {
    console.log(err);
    return err;
  }
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
module.exports = {
  createRule,
  updateRule,
  deleteOneRule,
  deleteAllRule,
};
