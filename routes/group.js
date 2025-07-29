const { Router } = require('express');
const router = Router();
const { group: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllGroup);
router.get('/get/:id', ctrl.getGroup);
router.post('/create', checkPermission, ctrl.createGroup);
router.post('/edit/:id', checkPermission, ctrl.editGroup);
router.delete('/delete/:id', checkPermission, ctrl.deleteGroup);

module.exports = routerGroup = router;
