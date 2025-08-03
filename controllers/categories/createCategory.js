const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

const createCategory = async (req, res, next) => {
  const { CAT0_ID, CAT0_NAME } = req.body;
  try {
    const createNewCategory = await Categories.create({
      CAT0_ID,
      CAT0_NAME,
    });
    console.log('createNewCategory', createNewCategory);
    res.status(200).json({
      success: true,
      data: createNewCategory,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createCategory;
