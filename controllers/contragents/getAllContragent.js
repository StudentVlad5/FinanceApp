const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const getAllContragents = async (req, res, next) => {
  try {
    const contragents = await Contragents.find();
    res.status(200).json(contragents);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllContragents;
