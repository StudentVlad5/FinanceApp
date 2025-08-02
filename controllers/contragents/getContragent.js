const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const getcontragent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contragent = await Contragents.find({ _id: id });
    res.status(200).json(contragent);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getcontragent;
