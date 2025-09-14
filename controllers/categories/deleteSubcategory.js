const { Categories } = require('../../models');

const deleteSubcategory = async (req, res) => {
  const { level, topCategoryId, parentId, subId } = req.params;

  try {
    const category = await Categories.findOne({ _id: topCategoryId });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Верхня категорія не знайдена',
      });
    }

    if (level === '1') {
      // Видаляємо CAT1 із головної категорії
      category.CAT_SUBCATEGORIES = category.CAT_SUBCATEGORIES.filter(
        (c1) => c1.CAT1_ID !== Number(subId),
      );
    } else if (level === '2') {
      let found = false;
      category.CAT_SUBCATEGORIES.forEach((c1) => {
        if (c1.CAT1_ID === Number(parentId)) {
          const before = c1.CAT_SUBCATEGORIES.length;
          c1.CAT_SUBCATEGORIES = c1.CAT_SUBCATEGORIES.filter(
            (c2) => c2.CAT2_ID !== Number(subId),
          );
          if (c1.CAT_SUBCATEGORIES.length < before) found = true;
        }
      });
      if (!found)
        return res
          .status(404)
          .json({ success: false, message: 'Субкатегорія не знайдена' });
    } else if (level === '3') {
      let found = false;
      category.CAT_SUBCATEGORIES.forEach((c1) => {
        c1.CAT_SUBCATEGORIES.forEach((c2) => {
          if (c2.CAT2_ID === Number(parentId)) {
            const before = c2.CAT_SUBCATEGORIES.length;
            c2.CAT_SUBCATEGORIES = c2.CAT_SUBCATEGORIES.filter(
              (c3) => c3.CAT3_ID !== Number(subId),
            );
            if (c2.CAT_SUBCATEGORIES.length < before) found = true;
          }
        });
      });
      if (!found)
        return res
          .status(404)
          .json({ success: false, message: 'Субкатегорія не знайдена' });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Рівень субкатегорії вказано невірно',
      });
    }

    await category.save();
    res.status(200).json({
      success: true,
      message: `Субкатегорія рівня ${level} видалена`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = deleteSubcategory;
