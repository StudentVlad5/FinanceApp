const { Categories } = require('../../models');
const generateId = require('../../helpers/generateId');

// --- Створити головну категорію (CAT0) ---
const createCategory = async (req, res) => {
  try {
    const CAT_ID = await generateId('CAT');
    const {
      CAT_NAME,
      CAT_PARENT_ID = null,
      CAT_TYPE_PROFITABLE = true,
    } = req.body;

    const CAT_LEVEL = CAT_PARENT_ID ? 1 : 0; // або рахуємо рівень динамічно

    const newCategory = await Categories.create({
      CAT_ID,
      CAT_NAME,
      CAT_PARENT_ID,
      CAT_LEVEL,
      CAT_TYPE_PROFITABLE,
    });

    res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = createCategory;
