const { Router } = require('express');
const router = Router();
const { reports: ctrl } = require('../controllers');

router.get('/get_contragents_income', ctrl.getReportsContragentsIncome);
router.get('/get_contragents_expenses', ctrl.getReportsContragentsExpenses);
router.get('/get_reports_by_tags_summary', ctrl.getReportsByTagsSummary);
router.get('/get_tag_details', ctrl.getReportsTagDetails);
router.get('/get_categories_income', ctrl.getReportsByCategoriesIncome);
router.get('/get_categories_expenses', ctrl.getReportsCategoriesExpenses);

module.exports = routerReports = router;
