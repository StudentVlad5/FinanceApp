const { Categories } = require('../../models');
const generateId = require('../../helpers/generateId');
const getRootCategory = require('../../helpers/getRootCategory');

// --- Створити категорію ---
const createCategory = async (req, res) => {
  try {
    const CAT_ID = await generateId('CAT');
    const { CAT_NAME, CAT_PARENT_ID = null } = req.body;

    let CAT_TYPE_PROFITABLE = true;
    let CAT_LEVEL = 0;

    if (CAT_PARENT_ID) {
      // шукаємо кореневу категорію
      const rootCategory = await getRootCategory(CAT_PARENT_ID);

      if (!rootCategory) {
        return res.status(400).json({
          success: false,
          message: 'Parent category not found',
        });
      }

      // підкатегорія наслідує значення від root
      CAT_TYPE_PROFITABLE = rootCategory.CAT_TYPE_PROFITABLE;

      // рівень = рівень батька + 1
      const parentCategory = await Categories.findOne({
        CAT_ID: CAT_PARENT_ID,
      });
      CAT_LEVEL = parentCategory.CAT_LEVEL + 1;
    } else {
      // якщо це 0 рівень — використовуємо з тіла запиту
      CAT_TYPE_PROFITABLE =
        req.body.CAT_TYPE_PROFITABLE !== undefined
          ? req.body.CAT_TYPE_PROFITABLE
          : true;
    }

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
