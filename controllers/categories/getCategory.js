const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

// --- Отримати одну категорію ---
const getCategory = async (req, res) => {
  try {
    const { id } = req.params; // CAT_ID
    const category = await Categories.findOne({ CAT_ID: Number(id) });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Категорія не знайдена' });

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = getCategory;
