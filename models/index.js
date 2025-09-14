const Account = require('./accounts');
const Currency = require('./currency');
const Group = require('./group');
const Types = require('./types');
const Reestr = require('./reestr');
const Contragents = require('./contragents');
const Tags = require('./tags');
const Categories = require('./categories');
const CategNames = require('./categnames');
const Counter = require('./counter');
const {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
} = require('./user');

module.exports = {
  Account,
  Currency,
  Group,
  Types,
  Reestr,
  Contragents,
  Tags,
  Categories,
  CategNames,
  Users,
  Counter,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
};
