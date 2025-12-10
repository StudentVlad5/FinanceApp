const { Reestr } = require('../../models');

const getReportsByCategories = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      {
        $match: {
          RE_TRANS_RE: -1,
          $expr: { $gt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      // Розрахунок грошей з курсом
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

      // Побудова дерева категорій (включаємо всіх предків)
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$RE_CAT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'category_hierarchy',
          depthField: 'level',
        },
      },

      // Створюємо масив імен від root до leaf
      {
        $addFields: {
          categoryPath: {
            $map: {
              input: { $reverseArray: '$category_hierarchy' },
              as: 'c',
              in: '$$c.CAT_NAME',
            },
          },
        },
      },

      // root = перший елемент
      // subPath = решта
      {
        $addFields: {
          categoryPath: {
            $cond: [{ $isArray: '$categoryPath' }, '$categoryPath', []],
          },
        },
      },

      {
        $addFields: {
          rootCategory: { $arrayElemAt: ['$categoryPath', 0] },
          subCategoryPath: {
            $cond: [
              { $gt: [{ $size: '$categoryPath' }, 1] },
              { $slice: ['$categoryPath', 1, { $size: '$categoryPath' }] },
              [], // якщо тільки root
            ],
          },
        },
      },

      // Групування: Root → FullPath → details
      {
        $group: {
          _id: {
            root: '$rootCategory',
            subPath: '$subCategoryPath',
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

      // Фінальне групування по root category
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

module.exports = getReportsByCategories;
