const { Categories } = require('../../models');

// const getReportsByCategoriesIncome = async (req, res) => {
//   try {
//     const aggregatedData = await Categories.aggregate([
//       // 1. Беремо тільки витратні категорії
//       { $match: { CAT_TYPE_PROFITABLE: true } },

//       // 2. Приєднуємо операції з реєстру (Reestr)
//       {
//         $lookup: {
//           from: 'reestrs', // назва колекції в БД
//           let: { catId: '$CAT_ID' },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ['$RE_CAT_ID', '$$catId'] },
//                     { $eq: ['$RE_TRANS_RE', -1] }, // тільки витрати
//                     // Тут можна додати фільтр по датах, якщо потрібно на рівні БД:
//                     // { $gte: ['$RE_DATE', req.query.dateFrom] }
//                   ],
//                 },
//               },
//             },
//             // Розрахунок грошей для кожної операції
//             {
//               $addFields: {
//                 calculatedMoney: {
//                   $let: {
//                     vars: {
//                       m: { $toDouble: '$RE_MONEY' },
//                       k: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
//                     },
//                     in: {
//                       $cond: [
//                         { $and: [{ $ne: ['$$k', 1] }, { $ne: ['$$k', 0] }] },
//                         { $multiply: ['$$m', '$$k'] },
//                         '$$m',
//                       ],
//                     },
//                   },
//                 },
//               },
//             },
//           ],
//           as: 'operations',
//         },
//       },

//       // 3. Додаємо допоміжні Lookups для назв (рахунки, контрагенти)
//       // Оскільки операцій багато, ми робимо це всередині pipeline вище або окремо
//       // Для швидкості краще приєднувати назви лише до тих категорій, де є операції

//       // 4. Формуємо фінальні поля
//       {
//         $project: {
//           _id: '$CAT_ID',
//           categoryName: '$CAT_NAME',
//           parentID: '$CAT_PARENT_ID',
//           level: '$CAT_LEVEL',
//           operations: 1,
//           totalSum: { $sum: '$operations.calculatedMoney' },
//         },
//       },

//       // 5. Сортуємо для зручності фронту
//       { $sort: { level: 1, categoryName: 1 } },
//     ]);

//     res.status(200).json(aggregatedData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Помилка при обробці даних' });
//   }
// };

const getReportsByCategoriesIncome = async (req, res) => {
  try {
    const aggregatedData = await Categories.aggregate([
      // 1. Беремо тільки дохідні категорії
      { $match: { CAT_TYPE_PROFITABLE: true } },

      // 2. Приєднуємо операції з реєстру (Reestr)
      {
        $lookup: {
          from: 'reestrs',
          let: { catId: '$CAT_ID' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$RE_CAT_ID', '$$catId'] },
                    { $eq: ['$RE_TRANS_RE', -1] },
                  ],
                },
              },
            },
            // Використовуємо готове поле RE_SUM_UAH
            {
              $addFields: {
                calculatedMoney: {
                  $convert: {
                    input: '$RE_SUM_UAH',
                    to: 'double',
                    onError: 0.0,
                    onNull: 0.0,
                  },
                },
              },
            },
          ],
          as: 'operations',
        },
      },

      // 3. Формуємо фінальні поля ТАК ЖЕ, як було в працюючому коді витрат
      {
        $project: {
          _id: '$CAT_ID',
          categoryName: '$CAT_NAME',
          parentID: '$CAT_PARENT_ID',
          level: '$CAT_LEVEL',
          operations: 1,
          totalSum: { $sum: '$operations.calculatedMoney' },
        },
      },

      // 4. Сортуємо для зручності фронту
      { $sort: { level: 1, categoryName: 1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error('Помилка у звіті по доходах категорій:', err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsByCategoriesIncome;
