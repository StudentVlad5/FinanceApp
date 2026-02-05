const { Reestr } = require('../../models');

const getReportsCategoriesExpenses = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Фільтрація доходів (стандартно)
      {
        $match: {
          RE_TRANS_RE: -1,
          // $expr: { $lt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      // 2. Розрахунок грошей (без змін)
      {
        $addFields: {
          calculatedMoney: {
            $let: {
              vars: {
                money: { $toDouble: '$RE_MONEY' },
                kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
              },
              in: {
                $cond: {
                  if: {
                    $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }],
                  },
                  then: { $multiply: ['$$money', '$$kurs'] },
                  else: '$$money',
                },
              },
            },
          },
        },
      },

      // 3. Знаходимо поточну категорію
      {
        $lookup: {
          from: 'categories',
          localField: 'RE_CAT_ID',
          foreignField: 'CAT_ID',
          as: 'currentCategory',
        },
      },
      { $unwind: '$currentCategory' },
      // --- ДОДАНО ТУТ ---
      // 3.1. Фільтруємо лише прибуткові категорії
      {
        $match: {
          'currentCategory.CAT_TYPE_PROFITABLE': false,
        },
      },
      // -----------------
      // 4. Знаходимо всіх батьків (ancestors)
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$currentCategory.CAT_PARENT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'ancestors',
        },
      },

      // 5. Об'єднуємо поточну категорію та батьків в один масив "unsortedCats"
      {
        $addFields: {
          unsortedCats: {
            $concatArrays: ['$ancestors', ['$currentCategory']],
          },
        },
      },

      // 6. БЕЗПЕЧНЕ СОРТУВАННЯ (Без $sort та $unwind)
      // Ми вручну вибираємо рівні по черзі. Це не навантажує пам'ять.
      // Припускаємо, що глибина вкладеності не більше 6 рівнів (для бухгалтерії цього зазвичай достатньо).
      {
        $addFields: {
          sortedHierarchy: {
            $concatArrays: [
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 0] },
                },
              },
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 1] },
                },
              },
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 2] },
                },
              },
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 3] },
                },
              },
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 4] },
                },
              },
              {
                $filter: {
                  input: '$unsortedCats',
                  as: 'c',
                  cond: { $eq: ['$$c.CAT_LEVEL', 5] },
                },
              },
            ],
          },
        },
      },

      // 7. Витягуємо імена з відсортованого масиву
      {
        $addFields: {
          sortedPathNames: {
            $map: {
              input: '$sortedHierarchy',
              as: 'item',
              in: '$$item.CAT_NAME',
            },
          },
        },
      },
      // 8. Розбиваємо на Root та SubPath
      {
        $addFields: {
          rootCategory: { $arrayElemAt: ['$sortedPathNames', 0] },
          subCategoryPath: {
            $cond: {
              // Якщо в ієрархії більше 1 елемента, беремо хвіст як підкатегорії
              if: { $gt: [{ $size: '$sortedPathNames' }, 1] },
              then: {
                $slice: ['$sortedPathNames', 1, { $size: '$sortedPathNames' }],
              },
              // Якщо тільки 1 елемент — це операція в корінь, шлях порожній
              else: [],
            },
          },
        },
      },

      // 9. Групування: Root -> Path -> Details
      {
        $group: {
          _id: {
            root: '$rootCategory',
            subPath: '$subCategoryPath', // Порожній масив [] тепер теж є ключем групування
          },
          totalMoney: { $sum: '$calculatedMoney' },
          details: {
            $push: {
              RE_ID: '$RE_ID',
              RE_DATE: '$RE_DATE',
              RE_KOMENT: '$RE_KOMENT',
              RE_MONEY: '$calculatedMoney',
            },
          },
        },
      },

      // 10. Фінальне групування по Root
      {
        $group: {
          _id: '$_id.root',
          categories: {
            $push: {
              path: '$_id.subPath',
              totalMoney: '$totalMoney',
              details: '$details',
            },
          },
        },
      },

      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsCategoriesExpenses;
