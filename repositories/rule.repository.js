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
const updateRule = async (_id, body) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = _id;
    const updateObject = body;
    // eslint-disable-next-line no-underscore-dangle, max-len
    const rule = await RuleModel.updateMany(
      { _id: id },
      { $set: updateObject },
    );
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

module.exports = {
  createRule,
  updateRule,
  deleteOneRule,
  deleteAllRule,
};
