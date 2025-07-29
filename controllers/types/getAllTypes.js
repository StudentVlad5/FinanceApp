const { ValidationError } = require('../../helpers');
const { Types } = require('../../models');

const getAllTypes = async (req, res, next) => {
  try {
    const type = await Types.find();
    res.status(200).json(type);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllTypes;
