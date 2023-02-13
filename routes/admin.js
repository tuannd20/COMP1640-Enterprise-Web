const express = require("express");


const router = express.Router();

router.get("/account", AccountController.displayListAccount);
router.put("/account/edit", AccountController.displayListAccount);
router.post("/account/create", AccountController.displayListAccount);

router.get("/terms", TermsController.displayListTerms);



module.exports = router;
