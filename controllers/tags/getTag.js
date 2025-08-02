const { ValidationError } = require('../../helpers');
const { Tags } = require('../../models');

const getTag = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tag = await Tags.find({ _id: id });
    res.status(200).json(tag);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getTag;
