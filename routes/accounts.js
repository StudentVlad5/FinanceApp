const { Router } = require('express');
const router = Router();
const { accounts: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllAccounts);
router.get('/get', ctrl.getAccount);
router.post('/create', checkPermission, ctrl.createAccount);
router.post('/edit/:id', checkPermission, ctrl.editAccount);
router.delete('/delete/:id', checkPermission, ctrl.deleteAccount);

module.exports = routerAccouns = router;
