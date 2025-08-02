const { Router } = require('express');
const router = Router();
const { contragents: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllContragents);
router.get('/get/:id', ctrl.getContragent);
router.post('/create', checkPermission, ctrl.createContragent);
router.post('/edit/:id', checkPermission, ctrl.editContragent);
router.delete('/delete/:id', checkPermission, ctrl.deleteContragent);

module.exports = routerContragents = router;
