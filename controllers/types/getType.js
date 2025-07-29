const { ValidationError } = require('../../helpers');
const { Types } = require('../../models');

const getType = async (req, res, next) => {
  const { id } = req.params;
  try {
    const type = await Types.find({ _id: id });
    res.status(200).json(type);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getType;
