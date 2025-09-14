const { Categories } = require('../../models');
const generateId = require('../../helpers/generateId');

const addSubcategory = async (req, res) => {
  const { level } = req.params; // 1 | 2 | 3
  const { topCategoryId, parentId, subcategory } = req.body;

  try {
    // шукаємо документ верхнього рівня
    let category = await Categories.findOne({ _id: topCategoryId });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Не знайдена батьківська категорія' });

    if (level === '1') {
      const newId = await generateId('CAT1');
      category.CAT_SUBCATEGORIES.push({
        CAT1_ID: newId,
        CAT1_NAME: subcategory.CAT1_NAME || '',
        CAT_SUBCATEGORIES: [],
      });
    } else if (level === '2') {
      const newId = await generateId('CAT2');
      category.CAT_SUBCATEGORIES.forEach((c1) => {
        if (c1.CAT1_ID === parentId) {
          // тут parentId = CAT1_ID (число)
          c1.CAT_SUBCATEGORIES.push({
            CAT2_ID: newId,
            CAT2_NAME: subcategory.CAT2_NAME || '',
            CAT_SUBCATEGORIES: [],
          });
        }
      });
    } else if (level === '3') {
      const newId = await generateId('CAT3');
      category.CAT_SUBCATEGORIES.forEach((c1) => {
        c1.CAT_SUBCATEGORIES.forEach((c2) => {
          if (c2.CAT2_ID === parentId) {
            // тут parentId = CAT2_ID (число)
            c2.CAT_SUBCATEGORIES.push({
              CAT3_ID: newId,
              CAT3_NAME: subcategory.CAT3_NAME || '',
            });
          }
        });
      });
    }

    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = addSubcategory;
