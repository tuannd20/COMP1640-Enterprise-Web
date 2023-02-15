const RuleRepository = require("../repositories/rule.repository");

const createRule = async (data) => {
  try {
    const rule = await RuleRepository.createRule(data);

    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateRule = async (id, data) => {
  try {
    const rule = await RuleRepository.updateRule(id, data);
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const displayRuleById = async (id) => {
  try {
    const rule = await RuleRepository.displayRuleById(id);

    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteOneRule = async (_id) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const rule = await RuleRepository.deleteOneRule(id);
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllRule = async () => {
  try {
    const rule = await RuleRepository.deleteAllRule();
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllRule = async () => {
  try {
    const rules = await RuleRepository.getAllRule();
    return rules;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRule,
  updateRule,
  getAllRule,
  deleteOneRule,
  deleteAllRule,
  displayRuleById,
};
