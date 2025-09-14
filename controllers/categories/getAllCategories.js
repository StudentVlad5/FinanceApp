const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');
// const { Reestr } = require('../../models');
// const { CategNames } = require('../../models');

// let migrationInProgress = false;

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);

    // if (migrationInProgress) {
    //   return res
    //     .status(200)
    //     .json({ message: 'Міграція вже виконується або завершена' });
    // }
    // migrationInProgress = true;

    // console.log('Починаємо міграцію...');
    // const reestrs = await Reestr.find().lean();
    // const categoriesFlat = await Categories.find().lean(); // для імен
    // const categNames = await CategNames.find().lean(); // для ієрархії

    // // --- Створюємо мапу ID -> NAME для всіх ID ---
    // const nameMap = new Map();
    // categoriesFlat.forEach((c) => {
    //   nameMap.set(c.CAT0_ID, c.CAT0_NAME);
    // });
    // // Додаємо всі ID з CategNames на випадок відсутніх у Categories
    // categNames.forEach((c) => {
    //   [c.CAT_ID0, c.CAT_ID1, c.CAT_ID2, c.CAT_ID3].forEach((id) => {
    //     if (id && !nameMap.has(id)) {
    //       nameMap.set(id, 'Без назви');
    //     }
    //   });
    // });

    // // --- Будуємо дерево Categories ---
    // const treeMap = new Map();

    // for (const c of categNames) {
    //   const { CAT_ID0, CAT_ID1, CAT_ID2, CAT_ID3 } = c;

    //   if (!treeMap.has(CAT_ID0)) {
    //     treeMap.set(CAT_ID0, {
    //       CAT0_ID: CAT_ID0,
    //       CAT0_NAME: nameMap.get(CAT_ID0) || 'Без назви',
    //       CAT_SUBCATEGORIES: [],
    //     });
    //   }
    //   const lvl0 = treeMap.get(CAT_ID0);

    //   if (CAT_ID1) {
    //     let lvl1 = lvl0.CAT_SUBCATEGORIES.find((s) => s.CAT1_ID === CAT_ID1);
    //     if (!lvl1) {
    //       lvl1 = {
    //         CAT1_ID: CAT_ID1,
    //         CAT1_NAME: nameMap.get(CAT_ID1) || 'Без назви',
    //         CAT_SUBCATEGORIES: [],
    //       };
    //       lvl0.CAT_SUBCATEGORIES.push(lvl1);
    //     }

    //     if (CAT_ID2) {
    //       let lvl2 = lvl1.CAT_SUBCATEGORIES.find((s) => s.CAT2_ID === CAT_ID2);
    //       if (!lvl2) {
    //         lvl2 = {
    //           CAT2_ID: CAT_ID2,
    //           CAT2_NAME: nameMap.get(CAT_ID2) || 'Без назви',
    //           CAT_SUBCATEGORIES: [],
    //         };
    //         lvl1.CAT_SUBCATEGORIES.push(lvl2);
    //       }

    //       if (CAT_ID3) {
    //         let lvl3 = lvl2.CAT_SUBCATEGORIES.find(
    //           (s) => s.CAT3_ID === CAT_ID3,
    //         );
    //         if (!lvl3) {
    //           lvl3 = {
    //             CAT3_ID: CAT_ID3,
    //             CAT3_NAME: nameMap.get(CAT_ID3) || 'Без назви',
    //           };
    //           lvl2.CAT_SUBCATEGORIES.push(lvl3);
    //         }
    //       }
    //     }
    //   }
    // }

    // // --- Перезаписуємо Categories ---
    // const newCategories = Array.from(treeMap.values());
    // await Categories.deleteMany({});
    // await Categories.insertMany(newCategories);
    // console.log('Колекція Categories оновлена.');

    // // --- Оновлюємо Reestr: додаємо CAT_ID0..3 ---
    // for (const item of reestrs) {
    //   // знаходимо категорію по RE_CAT_ID
    //   const cat = categNames.find((c) => c.CAT_ID === item.RE_CAT_ID);

    //   await Reestr.updateOne(
    //     { _id: item._id },
    //     {
    //       $set: {
    //         CAT_ID0: cat ? cat.CAT_ID0 : 0,
    //         CAT_ID1: cat ? cat.CAT_ID1 : 0,
    //         CAT_ID2: cat ? cat.CAT_ID2 : 0,
    //         CAT_ID3: cat ? cat.CAT_ID3 : 0,
    //       },
    //     },
    //   );
    // }

    // console.log('Колекція Reestr оновлена з CAT_ID0..3.');
    // console.log('Міграція завершена.');
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllCategories;
