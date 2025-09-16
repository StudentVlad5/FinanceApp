const { Categories } = require('../../models');
// const fs = require('fs');
// let count = 1;

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

  // async function migrate() {
  //   count += 1;
  //   // видалимо старі індекси (залишились CAT0_ID_1 і т.д.)
  //   try {
  //     await Categories.collection.dropIndexes();
  //     console.log('🗑️ Старі індекси видалено');
  //   } catch (err) {
  //     if (err.code === 26) {
  //       console.log('ℹ️ Індексів не знайдено');
  //     } else {
  //       throw err;
  //     }
  //   }

  //   // читаємо json файли
  //   const cat0 = JSON.parse(fs.readFileSync('./CAT0.json', 'utf8'));
  //   const category = JSON.parse(fs.readFileSync('./CATEGORY.json', 'utf8'));

  //   // словник ID -> NAME
  //   const namesMap = new Map();
  //   cat0.forEach((c) => {
  //     namesMap.set(c.CAT0_ID, c.CAT0_NAME);
  //   });

  //   // щоб не дублювати
  //   const processed = new Set();

  //   // функція додавання в колекцію
  //   const saveDoc = async (id, parentId, level) => {
  //     if (!id || id === 0) return; // пропускаємо 0
  //     if (processed.has(id)) return; // вже додавали

  //     const doc = {
  //       CAT_ID: id,
  //       CAT_NAME: namesMap.get(id) || '',
  //       CAT_PARENT_ID: parentId,
  //       CAT_LEVEL: level,
  //       CAT_TYPE_PROFITABLE: true,
  //     };

  //     await Categories.updateOne(
  //       { CAT_ID: id },
  //       { $set: doc },
  //       { upsert: true },
  //     );
  //     processed.add(id);
  //     console.log(`✅ збережено категорію: ${id} (${doc.CAT_NAME})`);
  //   };

  //   // обхід категорій
  //   for (const cat of category) {
  //     await saveDoc(cat.CAT_ID0, null, 0);
  //     await saveDoc(cat.CAT_ID1, cat.CAT_ID0, 1);
  //     await saveDoc(cat.CAT_ID2, cat.CAT_ID1, 2);
  //     await saveDoc(cat.CAT_ID3, cat.CAT_ID2, 3);
  //   }

  //   console.log(
  //     `🎉 Міграція завершена. Додано/оновлено ${processed.size} категорій`,
  //   );
  // }

  // if (count === 1)
  //   migrate().catch((err) => console.error('❌ Помилка міграції:', err));
};

module.exports = getAllCategories;
