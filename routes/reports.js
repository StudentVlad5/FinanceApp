const { Router } = require('express');
const router = Router();
const { reports: ctrl } = require('../controllers');

router.get('/get_contragents_income', ctrl.getReportsContragentsIncome);
router.get('/get_contragents_expenses', ctrl.getReportsContragentsExpenses);

module.exports = routerReports = router;
