const RuleModel = require("../database/models/Rule");

const createRule = async (data) => {
  try {
    const rule = await RuleModel.create(data);

    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const displayRuleById = async (id) => {
  try {
    const rule = await RuleModel.findById(id);

    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const updateRule = async (id, data) => {
  try {
    const rule = await RuleModel.updateMany(id, data);
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteOneRule = async (_id, body) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const rule = await RuleModel.findByIdAndRemove(id);
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteAllRule = async () => {
  try {
    const rule = await RuleModel.deleteMany();
    return rule;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllRule = async () => {
  try {
    const rules = await RuleModel.find();
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
