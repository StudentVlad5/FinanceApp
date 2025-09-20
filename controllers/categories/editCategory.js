const getRootCategory = require('../../helpers/getRootCategory');
const { Categories } = require('../../models');

// --- Рекурсивне оновлення підкатегорій ---
async function updateSubCategories(parentId, profitableType) {
  const children = await Categories.find({
    CAT_PARENT_ID: parentId,
  });

  for (const child of children) {
    await child.update({ CAT_TYPE_PROFITABLE: profitableType });
    await updateSubCategories(child.CAT_ID, profitableType);
  }
}

// --- Редагувати категорію ---
const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const category = await Categories.findOne({ CAT_ID: Number(id) });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: 'Категорія не знайдена' });
    }

    // Якщо підкатегорія → забороняємо вручну змінювати CAT_TYPE_PROFITABLE
    if (category.CAT_LEVEL > 0) {
      if (updates.hasOwnProperty('CAT_TYPE_PROFITABLE')) {
        delete updates.CAT_TYPE_PROFITABLE;
      }

      // Підтягнемо значення від root
      const rootCategory = await getRootCategory(category.CAT_ID);
      if (rootCategory) {
        updates.CAT_TYPE_PROFITABLE = rootCategory.CAT_TYPE_PROFITABLE;
      }
    }

    // Оновлюємо категорію в БД
    const updatedCategory = await category.update(updates);

    // Якщо root і змінився CAT_TYPE_PROFITABLE → оновлюємо всі підкатегорії
    if (
      category.CAT_LEVEL === 0 &&
      updates.hasOwnProperty('CAT_TYPE_PROFITABLE') &&
      updates.CAT_TYPE_PROFITABLE !== category.CAT_TYPE_PROFITABLE
    ) {
      await updateSubCategories(category.CAT_ID, updates.CAT_TYPE_PROFITABLE);
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = editCategory;
