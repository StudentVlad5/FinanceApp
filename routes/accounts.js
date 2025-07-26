const { Router } = require("express");
const router = Router();
const { accounts: ctrl } = require("../controllers");

router.get("/get_all", ctrl.getAllAccounts);
router.get("/get", ctrl.getAccount);
router.post("/create", ctrl.createAccount);
router.post("/edit/:id", ctrl.editAccount);
router.delete("/delete/:id", ctrl.deleteAccount);

module.exports = routerAccouns = router;
