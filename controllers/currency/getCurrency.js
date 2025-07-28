const { ValidationError } = require('../../helpers');
const { Currency } = require('../../models');

const getCurrency = async (req, res, next) => {
  const { id } = req.params;
  try {
    const currency = await Currency.find({ _id: id });
    res.status(200).json(currency);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getCurrency;
