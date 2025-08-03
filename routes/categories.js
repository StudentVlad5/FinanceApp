const { Router } = require('express');
const router = Router();
const { categories: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/get_all', ctrl.getAllCategories);
router.get('/get/:id', ctrl.getCategory);
router.post('/create', checkPermission, ctrl.createCategory);
router.post('/edit/:id', checkPermission, ctrl.editCategory);
router.delete('/delete/:id', checkPermission, ctrl.deleteCategory);

module.exports = routerCategories = router;
