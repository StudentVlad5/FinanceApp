const { Reestr } = require('../../models');

const getReportsByCategoriesIncome = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Фільтрація доходів (гроші > 0)
      {
        $match: {
          RE_TRANS_RE: -1,
          // $expr: { $gt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      // 2. Розрахунок грошей з урахуванням курсу
      {
        $addFields: {
          calcMoney: {
            $let: {
              vars: {
                money: { $toDouble: '$RE_MONEY' },
                kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
              },
              in: {
                $cond: [
                  { $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }] },
                  { $multiply: ['$$money', '$$kurs'] },
                  '$$money',
                ],
              },
            },
          },
        },
      },

      // 3. ОПТИМІЗАЦІЯ: Попереднє групування за ID категорії
      // Це "стискає" тисячі транзакцій у кілька десятків груп категорій
      {
        $group: {
          _id: '$RE_CAT_ID',
          catTotal: { $sum: '$calcMoney' },
          transDetails: {
            $push: {
              RE_ID: '$RE_ID',
              RE_DATE: '$RE_DATE',
              RE_KOMENT: '$RE_KOMENT',
              RE_MONEY: '$calcMoney',
            },
          },
        },
      },

      // 4. Пошук інформації про категорію
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'CAT_ID',
          as: 'catInfo',
        },
      },
      { $unwind: '$catInfo' },

      // 5. Фільтрація типів категорій (наприклад, тільки CAT_TYPE_PROFITABLE: true)
      {
        $match: {
          'catInfo.CAT_TYPE_PROFITABLE': true,
        },
      },

      // 6. Пошук ієрархії батьків
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$catInfo.CAT_PARENT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'ancestors',
        },
      },

      // 7. Сортування ієрархії (від рівня 0 до поточного)
      {
        $addFields: {
          sortedHierarchy: {
            $let: {
              vars: { all: { $concatArrays: ['$ancestors', ['$catInfo']] } },
              in: {
                $concatArrays: [
                  {
                    $filter: {
                      input: '$$all',
                      as: 'c',
                      cond: { $eq: ['$$c.CAT_LEVEL', 0] },
                    },
                  },
                  {
                    $filter: {
                      input: '$$all',
                      as: 'c',
                      cond: { $eq: ['$$c.CAT_LEVEL', 1] },
                    },
                  },
                  {
                    $filter: {
                      input: '$$all',
                      as: 'c',
                      cond: { $eq: ['$$c.CAT_LEVEL', 2] },
                    },
                  },
                  {
                    $filter: {
                      input: '$$all',
                      as: 'c',
                      cond: { $eq: ['$$c.CAT_LEVEL', 3] },
                    },
                  },
                  {
                    $filter: {
                      input: '$$all',
                      as: 'c',
                      cond: { $eq: ['$$c.CAT_LEVEL', 4] },
                    },
                  },
                ],
              },
            },
          },
        },
      },

      // 8. Витягуємо лише імена для шляху
      {
        $addFields: {
          pathNames: {
            $map: { input: '$sortedHierarchy', as: 'h', in: '$$h.CAT_NAME' },
          },
        },
      },

      // 9. Розподіл на Корінь та Підшлях
      {
        $addFields: {
          rootName: { $arrayElemAt: ['$pathNames', 0] },
          subPath: {
            $cond: [
              { $gt: [{ $size: '$pathNames' }, 1] },
              { $slice: ['$pathNames', 1, { $size: '$pathNames' }] },
              [],
            ],
          },
        },
      },

      // 10. Фінальне збирання структури: Групуємо за кореневою категорією
      {
        $group: {
          _id: '$rootName',
          categories: {
            $push: {
              path: '$subPath',
              totalMoney: '$catTotal',
              details: '$transDetails',
            },
          },
        },
      },

      // 11. Сортування результатів за алфавітом
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsByCategoriesIncome;
