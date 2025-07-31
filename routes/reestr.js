const { Router } = require('express');
const router = Router();
const { reestr: ctrl } = require('../controllers');
// const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getReestr);
router.get('/get/:id', ctrl.getReestrById);

module.exports = routerReestr = router;
