const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllCategories;
