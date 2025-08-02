const { ValidationError } = require('../../helpers');
const { Tags } = require('../../models');

const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tags.find();
    res.status(200).json(tags);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllTags;
