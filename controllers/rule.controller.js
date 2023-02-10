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
    // eslint-disable-next-line no-underscore-dangle
    const id = req.params._id;
    const updateObject = req.body;
    // eslint-disable-next-line max-len
    const rule = await RuleService.updateMany(
      { _id: id },
      { $set: updateObject },
    )
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Rule is updated",
          updateRule: updateObject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
    return res.json("Rule page");
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteOneRule = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = req.params._id;
    const rule = await RuleService.findByIdAndRemove(id)
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Rule is deleted successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
    return res.json("Rule page");
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteAllRule = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const rule = await RuleService.deleteMany()
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Delete all rule successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      });
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
