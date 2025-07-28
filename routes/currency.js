const { Router } = require('express');
const router = Router();
const { currency: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllCurrencies);
router.get('/get/:id', ctrl.getCurrency);
router.post('/create', checkPermission, ctrl.createCurrency);
router.post('/edit/:id', checkPermission, ctrl.editCurrency);
router.delete('/delete/:id', checkPermission, ctrl.deleteCurrency);

module.exports = routerCurrency = router;
