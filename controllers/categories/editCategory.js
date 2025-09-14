const { Categories } = require('../../models');

const editCategory = async (req, res) => {
  const { CAT0_ID } = req.params;
  const { _id, ...updates } = req.body;
  try {
    const category = await Categories.findOneAndUpdate({ _id }, updates, {
      new: true,
      runValidators: true,
    });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Категорія не знайдена' });

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
module.exports = editCategory;
