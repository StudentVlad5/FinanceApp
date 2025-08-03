const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Categories.find({ _id: id });
    res.status(200).json(category);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getCategory;
