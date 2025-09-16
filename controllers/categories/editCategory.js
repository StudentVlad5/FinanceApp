const { Categories } = require('../../models');

// --- Редагувати категорію ---
const editCategory = async (req, res) => {
  try {
    const { id } = req.params; // CAT_ID
    const updates = req.body;

    const category = await Categories.findOneAndUpdate(
      { CAT_ID: Number(id) },
      updates,
      { new: true, runValidators: true },
    );

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
