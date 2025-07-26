const express = require('express');
const { auth: ctrl } = require('../controllers');
const { ctrlWrapper, authMiddleware, validation } = require('../middleWares');
const { upload } = require('../middleWares/uploadMiddleware');

const {
  userUpdateValidationSchema,
  userRegistationSchema,
} = require('../models');

const router = express.Router();

router.post('/signin', ctrlWrapper(ctrl.signin));
router.post(
  '/signup',
  validation(userRegistationSchema),
  ctrlWrapper(ctrl.signup),
);

router.post('/logout', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.logout));
router.post('/forgotPassword', ctrlWrapper(ctrl.forgotPassword));
router.post('/changePassword', ctrlWrapper(ctrl.changePassword));
router.post('/', ctrlWrapper(authMiddleware), ctrlWrapper(ctrl.current));

router.patch(
  '/user/:id',
  ctrlWrapper(authMiddleware),
  // upload.single('avatar'),
  validation(userUpdateValidationSchema),
  ctrlWrapper(ctrl.update),
);

module.exports = routerAuth = router;
