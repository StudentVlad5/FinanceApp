const { Categories } = require('../../models');

// --- Видалити категорію (і всі підкатегорії рекурсивно) ---
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // CAT_ID
    const category = await Categories.findOne({ CAT_ID: Number(id) });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: 'Категорія не знайдена' });

    // знайти всі дочірні категорії
    const deleteRecursively = async (catId) => {
      const children = await Categories.find({ CAT_PARENT_ID: catId });
      for (const child of children) {
        await deleteRecursively(child.CAT_ID);
      }
      await Categories.deleteOne({ CAT_ID: catId });
    };

    await deleteRecursively(category.CAT_ID);

    res
      .status(200)
      .json({ success: true, message: 'Категорія і підкатегорії видалені' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = deleteCategory;
