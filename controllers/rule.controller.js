const RuleService = require("../services/rule.service");

const renderCreateTermsPage = async (req, res) => {
  res.render("partials/master", {
    title: "Create new terms",
    content: "../admin/terms/createTermsPage",
    errorMessage: null,
    isFailed: false,
  });
};

const createRule = async (req, res) => {
  try {
    const titleTerms = req.body.title;
    const contentTerms = req.body.contentRule;
    // const { titleRule, contentRule } = req.body;
    // localStorage.setItem("title", titleRule);

    const checkTitle = await RuleService.findByTitle(titleTerms);

    if (!checkTitle) {
      const formData = req.body;
      const rule = await RuleService.createRule(formData);
      console.log("Create term: ", rule);
      return res.redirect("/admin/terms");
    }

    const errorTerm = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Create new terms",
      content: "../admin/terms/createTermsPage",
      errorMessage: errorTerm,
      code: errorCode,
      isFailed: true,
      titleRule: titleTerms,
      contentRule: contentTerms,
    });

    // return res.send(
    //   "<script>alert('Title is existed'); window.location.href='/admin/terms/create';</script>",
    // );
  } catch (err) {
    console.log(err);
    return err;
  }
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
    const { id } = req.params;
    const rule = await RuleService.deleteOneRule(id);

    return res.redirect("/admin/terms");
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

const displayAllRule = async (req, res) => {
  try {
    // const rules = await RuleService.displayAllRule();
    return res.render("partials/master", {
      title: "Display all terms",
      content: "../staff/termsPage",
      // rules,
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
  displayAllRule,
};
