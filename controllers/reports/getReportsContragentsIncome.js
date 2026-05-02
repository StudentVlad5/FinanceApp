const { Reestr } = require('../../models');

// const getReportsContragentsIncome = async (req, res) => {
//   try {
//     const aggregatedData = await Reestr.aggregate([
//       // 1. Фільтр доходів
//       {
//         $match: {
//           RE_TRANS_RE: -1,
//           $expr: { $gt: [{ $toDouble: '$RE_MONEY' }, 0] },
//         },
//       },

//       // 2. Розрахунок суми з курсом
//       {
//         $addFields: {
//           calculatedMoney: {
//             $let: {
//               vars: {
//                 money: { $toDouble: '$RE_MONEY' },
//                 kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
//               },
//               in: {
//                 $cond: {
//                   if: {
//                     $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }],
//                   },
//                   then: { $multiply: ['$$money', '$$kurs'] },
//                   else: '$$money',
//                 },
//               },
//             },
//           },
//         },
//       },

//       // 3. Групування по контрагенту
//       {
//         $group: {
//           _id: '$RE_PAYE_ID',
//           totalMoney: { $sum: { $abs: '$calculatedMoney' } },
//           details: {
//             $push: {
//               RE_ID: '$RE_ID',
//               RE_DATE: '$RE_DATE',
//               RE_CAT_ID: '$RE_CAT_ID',
//               RE_KOMENT: '$RE_KOMENT',
//               RE_SCH_ID: '$RE_SCH_ID',
//               RE_MONEY: '$calculatedMoney',
//             },
//           },
//         },
//       },

//       // 4. Контрагент
//       {
//         $lookup: {
//           from: 'contragents',
//           localField: '_id',
//           foreignField: 'PAYEE_ID',
//           as: 'contragent',
//         },
//       },
//       { $unwind: { path: '$contragent', preserveNullAndEmptyArrays: true } },

//       // 5. Деталі
//       { $unwind: '$details' },

//       // 6. Поточна категорія
//       {
//         $lookup: {
//           from: 'categories',
//           localField: 'details.RE_CAT_ID',
//           foreignField: 'CAT_ID',
//           as: 'currentCategory',
//         },
//       },
//       {
//         $unwind: { path: '$currentCategory', preserveNullAndEmptyArrays: true },
//       },

//       // 7. Всі батьки
//       {
//         $graphLookup: {
//           from: 'categories',
//           startWith: '$currentCategory.CAT_PARENT_ID',
//           connectFromField: 'CAT_PARENT_ID',
//           connectToField: 'CAT_ID',
//           as: 'ancestors',
//         },
//       },

//       // 8. Обʼєднуємо
//       {
//         $addFields: {
//           allCategories: {
//             $cond: [
//               { $ifNull: ['$currentCategory', false] },
//               { $concatArrays: ['$ancestors', ['$currentCategory']] },
//               [],
//             ],
//           },
//         },
//       },

//       // 9. Сортуємо по CAT_LEVEL
//       {
//         $addFields: {
//           sortedHierarchy: {
//             $concatArrays: [
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 0] },
//                 },
//               },
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 1] },
//                 },
//               },
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 2] },
//                 },
//               },
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 3] },
//                 },
//               },
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 4] },
//                 },
//               },
//               {
//                 $filter: {
//                   input: '$allCategories',
//                   as: 'c',
//                   cond: { $eq: ['$$c.CAT_LEVEL', 5] },
//                 },
//               },
//             ],
//           },
//         },
//       },

//       // 10. Формуємо рядок категорії
//       {
//         $addFields: {
//           'details.categoryName': {
//             $reduce: {
//               input: {
//                 $map: {
//                   input: '$sortedHierarchy',
//                   as: 'c',
//                   in: '$$c.CAT_NAME',
//                 },
//               },
//               initialValue: '',
//               in: {
//                 $cond: [
//                   { $eq: ['$$value', ''] },
//                   '$$this',
//                   { $concat: ['$$value', ' → ', '$$this'] },
//                 ],
//               },
//             },
//           },
//         },
//       },

//       // 11. Фінальне групування назад по контрагенту
//       {
//         $group: {
//           _id: '$_id',
//           PAYEE_NAME: { $first: '$contragent.PAYEE_NAME' },
//           totalMoney: { $first: '$totalMoney' },
//           details: { $push: '$details' },
//         },
//       },

//       { $sort: { totalMoney: -1 } },
//     ]);

//     res.status(200).json(aggregatedData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Помилка при обробці даних' });
//   }
// };

const getReportsContragentsIncome = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Початковий фільтр (Витрати: RE_SUM_UAH > 0)
      {
        $match: {
          RE_TRANS_RE: -1,
          $expr: { $gt: [{ $toDouble: '$RE_SUM_UAH' }, 0] },
        },
      },

      // 2. ПЕРШЕ ГРУПУВАННЯ (Згортаємо за парою Контрагент + Категорія)
      // Це потрібно для побудови ієрархії назв категорій без зайвих дублів
      {
        $group: {
          _id: { payee: '$RE_PAYE_ID', cat: '$RE_CAT_ID' },
          catTotal: { $sum: { $toDouble: '$RE_SUM_UAH' } },
          transDetails: {
            $push: {
              RE_ID: '$RE_ID',
              RE_DATE: '$RE_DATE',
              RE_KOMENT: '$RE_KOMENT',
              RE_MONEY: { $toDouble: '$RE_SUM_UAH' }, // Повертаємо назву RE_MONEY для фронта
            },
          },
        },
      },

      // 3. Приєднуємо категорію
      {
        $lookup: {
          from: 'categories',
          localField: '_id.cat',
          foreignField: 'CAT_ID',
          as: 'catInfo',
        },
      },
      { $unwind: { path: '$catInfo', preserveNullAndEmptyArrays: true } },

      // 4. Будуємо ієрархію через graphLookup
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$catInfo.CAT_PARENT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'anc',
        },
      },

      // 5. Формуємо рядок повної назви категорії (Category → Subcategory)
      {
        $addFields: {
          fullCatName: {
            $let: {
              vars: {
                all: { $concatArrays: ['$anc', ['$catInfo']] },
              },
              in: {
                $reduce: {
                  input: {
                    $map: {
                      input: {
                        $concatArrays: [
                          {
                            $filter: {
                              input: '$$all',
                              cond: { $eq: ['$$this.CAT_LEVEL', 0] },
                            },
                          },
                          {
                            $filter: {
                              input: '$$all',
                              cond: { $eq: ['$$this.CAT_LEVEL', 1] },
                            },
                          },
                          {
                            $filter: {
                              input: '$$all',
                              cond: { $eq: ['$$this.CAT_LEVEL', 2] },
                            },
                          },
                          {
                            $filter: {
                              input: '$$all',
                              cond: { $eq: ['$$this.CAT_LEVEL', 3] },
                            },
                          },
                        ],
                      },
                      as: 'c',
                      in: '$$c.CAT_NAME',
                    },
                  },
                  initialValue: '',
                  in: {
                    $cond: [
                      { $eq: ['$$value', ''] },
                      '$$this',
                      { $concat: ['$$value', ' → ', '$$this'] },
                    ],
                  },
                },
              },
            },
          },
        },
      },

      // 6. Додаємо назву категорії до деталей транзакцій
      {
        $addFields: {
          finalDetails: {
            $map: {
              input: '$transDetails',
              as: 'd',
              in: {
                $mergeObjects: [
                  '$$d',
                  {
                    categoryName: {
                      $ifNull: ['$fullCatName', 'Без категорії'],
                    },
                  },
                ],
              },
            },
          },
        },
      },

      // 7. ДРУГЕ ГРУПУВАННЯ (Збираємо все під одного контрагента)
      {
        $group: {
          _id: '$_id.payee',
          // Використовуємо $abs як у закоміченому коді для totalMoney
          totalMoney: { $sum: { $abs: '$catTotal' } },
          details: { $push: '$finalDetails' },
        },
      },

      // 8. Робимо масив деталей пласким (flatten) як у закоміченому коді
      {
        $addFields: {
          details: {
            $reduce: {
              input: '$details',
              initialValue: [],
              in: { $concatArrays: ['$$value', '$$this'] },
            },
          },
        },
      },

      // 9. Приєднуємо назву контрагента
      {
        $lookup: {
          from: 'contragents',
          localField: '_id',
          foreignField: 'PAYEE_ID',
          as: 'payeeInfo',
        },
      },

      // 10. Фінальна проекція структури
      {
        $project: {
          _id: 1,
          PAYEE_NAME: {
            $ifNull: [
              { $arrayElemAt: ['$payeeInfo.PAYEE_NAME', 0] },
              'Невідомий',
            ],
          },
          totalMoney: 1,
          details: 1,
        },
      },

      // 11. Сортування за сумою
      { $sort: { totalMoney: -1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error('Помилка при обробці звіту витрат:', err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsContragentsIncome;
