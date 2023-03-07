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

const deleteOneRule = async (id) => {
  try {
    const rule = await RuleModel.delete({ _id: id });
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
    const rules = await RuleModel.find().sort({ createdAt: -1 });
    return rules;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayAllRule = async () => {
  try {
    const rules = await RuleModel.find().sort({ createdAt: -1 });
    return rules;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const findByTitle = async (titleTerm) => {
  try {
    const title = await RuleModel.findOne({ title: titleTerm });
    return title;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const findByTitleExists = async (id, title) => {
  try {
    const checkTitleExists = await RuleModel.find()
      .where("title")
      .equals(title)
      .where("_id")
      .ne(id);
    return checkTitleExists;
  } catch (err) {
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
  displayAllRule,
  findByTitle,
  findByTitleExists,
};
