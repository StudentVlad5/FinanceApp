const { Router } = require('express');
const router = Router();
const { backup: ctrl } = require('../controllers');
const { checkPermission } = require('../middleWares');

router.get('/', checkPermission, ctrl.createBackup);

module.exports = routerBackup = router;
