const { Router } = require('express');
const router = Router();
const { categories: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

// --- Головні категорії ---
router.get('/get_all', ctrl.getAllCategories); // отримати всі категорії
router.get('/get/:id', ctrl.getCategory); // отримати категорію по CAT0_ID
router.post('/create', checkPermission, ctrl.createCategory); // створити головну категорію
router.patch('/edit/:id', checkPermission, ctrl.editCategory); // редагувати головну категорію
router.delete('/delete/:id', checkPermission, ctrl.deleteCategory); // видалити головну категорію

// --- Підкатегорії ---
router.post('/create/sub/:level', checkPermission, ctrl.addSubcategory); // додати підкатегорію (1-3)
router.delete(
  '/delete/sub/:level/:topCategoryId/:parentId/:subId',
  checkPermission,
  ctrl.deleteSubcategory,
);

module.exports = routerCategories = router;
