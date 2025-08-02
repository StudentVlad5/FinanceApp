const { Router } = require('express');
const router = Router();
const { tags: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllTags);
router.get('/get/:id', ctrl.getTag);
router.post('/create', checkPermission, ctrl.createTag);
router.post('/edit/:id', checkPermission, ctrl.editTag);
router.delete('/delete/:id', checkPermission, ctrl.deleteTag);

module.exports = routerTags = router;
