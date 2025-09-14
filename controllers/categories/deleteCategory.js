const { Categories } = require('../../models');

// --- Видалення головної категорії (CAT0) ---
const deleteCategory = async (req, res) => {
  const { id } = req.params; // це CAT0_ID

  try {
    const deleted = await Categories.findOneAndDelete({ _id: id });
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: 'Категорія не знайдена' });

    res
      .status(200)
      .json({ success: true, message: 'Категорія видалена успішно' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
module.exports = deleteCategory;
