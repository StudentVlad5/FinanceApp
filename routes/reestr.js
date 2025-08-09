const { Router } = require('express');
const router = Router();
const { reestr: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getReestr);
router.get('/get/:id', ctrl.getReestrById);
router.post('/create', checkPermission, ctrl.createReestr);
router.post('/edit/:id', checkPermission, ctrl.editReestr);
router.delete('/delete/:id', checkPermission, ctrl.deleteReestr);

module.exports = routerReestr = router;
