const RuleService = require("../services/rule.service");

const renderCreateTermsPage = async (req, res) => {
  const staff = req.cookies.Staff;

  res.render("partials/master", {
    title: "Create new terms",
    content: "../admin/terms/createTermsPage",
    errorMessage: null,
    isFailed: false,
    staff,
    role: staff.idRole.nameRole,
  });
};

const createRule = async (req, res) => {
  try {
    const staff = req.cookies.Staff;

    const titleTerms = req.body.title;
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
      staff,
      role: staff.idRole.nameRole,
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
  const staff = req.cookies.Staff;

  const term = await RuleService.displayRuleById({ _id: id });
  try {
    return res.render("partials/master", {
      title: "Edit term",
      content: "../admin/terms/editTermsPage",
      term,
      staff,
      errorMessage: null,
      isFailed: false,
      role: staff.idRole.nameRole,
    });
  } catch (err) {
    return err;
  }
};

const updateRule = async (req, res) => {
  const { id } = req.params;
  const staff = req.cookies.Staff;
  const term = await RuleService.displayRuleById({ _id: id });
  try {
    // localStorage.setItem("title", titleRule);
    const titleTerms = req.body.title;
    const contentTerms = req.body.contentRule;
    const checkTitle = await RuleService.findByTitle(titleTerms);

    if (!checkTitle) {
      const formData = req.body;
      const termUpdate = await RuleService.updateRule(
        { _id: id },
        { $set: formData },
      );
      return res.redirect("/admin/terms");
    }

    const errorTerm = "Title is already exists";
    const errorCode = 400;

    return res.status(errorCode).render("partials/master", {
      title: "Edit a term",
      content: "../admin/terms/editTermsPage",
      term,
      errorMessage: errorTerm,
      titleRule: titleTerms,
      contentRule: contentTerms,
      code: errorCode,
      isFailed: true,
      role: staff.idRole.nameRole,
      staff,
    });

    // return res.send(
    //   "<script>alert('Title is existed'); window.location.href='/admin/terms/create';</script>",
    // );
    // return res.redirect("/admin/terms");
  } catch (err) {
    return err;
  }
};

const displayTermById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = req.cookies.Staff;

    const rule = await RuleService.displayTermById({ _id: id });

    return res.render("partials/master", {
      title: "Edit Term",
      content: "../admin/terms/editTermsPage",
      rule,
      staff,
      role: staff.idRole.nameRole,
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
    const staff = req.cookies.Staff;

    const rules = await RuleService.getAllRule();
    let isHaveData = true;
    if (rules.toString() === "") {
      isHaveData = false;
    }

    return res.render("partials/master", {
      title: "List of terms",
      content: "../admin/terms/listTermsPage",
      rules,
      staff,
      role: staff.idRole.nameRole,
      isHaveData,
    });
    // return res.json(rules);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const displayAllRule = async (req, res) => {
  try {
    const staff = req.cookies.Staff;
    const rules = await RuleService.getAllRule();
    return res.render("partials/master", {
      title: "Display all terms",
      content: "../staff/termsPage",
      rules,
      staff,
      role: staff.idRole.nameRole,
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
