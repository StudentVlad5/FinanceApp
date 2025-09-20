const { Categories } = require('../models');

// --- Отримати кореневого (0 рівня) батька ---
async function getRootCategory(parentId) {
  let current = await Categories.findOne({ CAT_ID: parentId });

  if (!current) return null;

  while (current.CAT_PARENT_ID) {
    current = await Categories.findOne({ CAT_ID: current.CAT_PARENT_ID });
    if (!current) break;
  }

  return current;
}

module.exports = getRootCategory;
