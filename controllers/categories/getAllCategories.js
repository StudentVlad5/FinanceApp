const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');
const { Reestr } = require('../../models');
// const { CategNames } = require('../../models');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);

    // console.log('Починаємо міграцію...');

    // const reestrs = await Reestr.find().lean();
    // const categoriesOld = await Categories.find().lean();

    // const categoryNameMap = new Map(
    //   categoriesOld.map((c) => [c.CAT0_ID, c.CAT0_NAME]),
    // );

    // const categoryMap = new Map();

    // for (const item of reestrs) {
    //   const catId0 = item.RE_CAT_ID0 || null;
    //   const subCatId1 = item.RE_CAT_ID1 || null;

    //   // Пропускаємо, якщо немає коду категорії
    //   if (!catId0) continue;

    //   if (!categoryMap.has(catId0)) {
    //     categoryMap.set(catId0, {
    //       CAT0_ID: catId0,
    //       CAT0_NAME: categoryNameMap.get(catId0) || '',
    //       CAT_SUBCATEGORIES: [],
    //     });
    //   }

    //   const catEntry = categoryMap.get(catId0);

    //   if (
    //     subCatId1 &&
    //     !catEntry.CAT_SUBCATEGORIES.some((s) => s.CAT1_ID === subCatId1)
    //   ) {
    //     const subName = categoryNameMap.get(subCatId1) || 'Без назви';
    //     catEntry.CAT_SUBCATEGORIES.push({
    //       CAT1_ID: subCatId1,
    //       CAT1_NAME: subName,
    //     });
    //   }
    // }

    // const newCategories = Array.from(categoryMap.values());

    // // Перезапис колекції
    // await Categories.deleteMany({});
    // await Categories.insertMany(newCategories);

    // console.log('Міграція завершена.');

    // Цей варіант одним запитом видалить обидва поля у всіх документів у колекції Reestr
    // console.log('Start remove RE_CAT_ID1');
    // await Reestr.updateMany({}, { $unset: { CAT_ID1: '', CAT_ID2: '' } });

    // ДЛЯ ОНОВЛЕННЯ ДАНИХ ПО КАТЕГОРІЇ
    // const categNames = await CategNames.find();
    // const reestr = await Reestr.find();
    // const categMap = new Map(categNames.map((c) => [c.CAT_ID, c]));
    // console.log('Start renew RE_CAT_ID0');
    // for (const item of reestr) {
    //   const catData = categMap.get(item.RE_CAT_ID);

    //   item.RE_CAT_ID0 = catData ? catData.CAT_ID0 : 0;
    //   item.RE_CAT_ID1 = catData ? catData.CAT_ID1 : 0;
    //   item.RE_CAT_ID2 = catData ? catData.CAT_ID2 : 0;
    //   await item.save(); // зберігаємо зміни в документ
    // }
    // res.json({ message: 'CAT_ID1 та CAT_ID2 успішно оновлені в Reestr' });
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getAllCategories;
