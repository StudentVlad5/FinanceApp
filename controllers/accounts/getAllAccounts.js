const { ValidationError } = require("../../helpers");
const { Account } = require("../../models");

const getAllAccounts = async (req, res, next) => {
  try {
    const acounts = await Account.find();
    res.status(200).json(acounts);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllAccounts;
