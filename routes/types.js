const { Router } = require('express');
const router = Router();
const { types: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllTypes);
router.get('/get/:id', ctrl.getType);
router.post('/create', checkPermission, ctrl.createType);
router.post('/edit/:id', checkPermission, ctrl.editType);
router.delete('/delete/:id', checkPermission, ctrl.deleteType);

module.exports = routerTypes = router;
