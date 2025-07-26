const Account = require('./accounts');
const {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
} = require('./user');

module.exports = {
  Account,
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
};
