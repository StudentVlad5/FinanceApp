const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

const editCategory = async (req, res, next) => {
  const { CAT0_ID, CAT0_NAME } = req.body;
  const { id } = req.params;
  try {
    const newEditCategory = await Categories.findByIdAndUpdate(
      { _id: id },
      {
        CAT0_ID,
        CAT0_NAME,
      },
    );
    res.status(200).json(newEditCategory);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editCategory;
