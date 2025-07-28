const { ValidationError } = require('../../helpers');
const { Currency } = require('../../models');

const getAllCurrencies = async (req, res, next) => {
  try {
    const currencies = await Currency.find();
    res.status(200).json(currencies);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllCurrencies;
