const { ValidationError } = require('../../helpers');
const { Account } = require('../../models');

const getAccount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.find({ _id: id });
    res.status(200).json(account);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAccount;
