const { Router } = require('express');
const router = Router();
const { reports: ctrl } = require('../controllers');

router.get('/get_contragents_income', ctrl.getReportsContragentsIncome);

module.exports = routerReports = router;
