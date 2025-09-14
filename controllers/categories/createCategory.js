const { Categories } = require('../../models');
const generateId = require('../../helpers/generateId');

// --- Створити головну категорію (CAT0) ---
const createCategory = async (req, res) => {
  const CAT0_ID = await generateId('CAT0');
  const { CAT0_NAME } = req.body;
  try {
    const exists = await Categories.findOne({ CAT0_ID });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Категорія з таким CAT0_ID вже існує',
      });
    }

    const newCategory = await Categories.create({ CAT0_ID, CAT0_NAME });
    res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = createCategory;
