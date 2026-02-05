const { Reestr } = require('../../models');

const getReportsContragentsExpenses = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Початковий фільтр (Витрати)
      {
        $match: {
          RE_TRANS_RE: -1,
          $expr: { $lt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      // 2. Розрахунок грошей (на місці, щоб не тягнути зайве)
      {
        $addFields: {
          calcMoney: {
            $let: {
              vars: {
                m: { $toDouble: '$RE_MONEY' },
                k: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
              },
              in: {
                $cond: [
                  { $and: [{ $ne: ['$$k', 1] }, { $ne: ['$$k', 0] }] },
                  { $multiply: ['$$m', '$$k'] },
                  '$$m',
                ],
              },
            },
          },
        },
      },

      // 3. ПЕРШЕ ГРУПУВАННЯ (Згортаємо дані, щоб зменшити кількість документів)
      {
        $group: {
          _id: { payee: '$RE_PAYE_ID', cat: '$RE_CAT_ID' },
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

      // 4. Приєднуємо категорію (тільки один раз для унікальної пари Контрагент-Категорія)
      {
        $lookup: {
          from: 'categories',
          localField: '_id.cat',
          foreignField: 'CAT_ID',
          as: 'catInfo',
        },
      },
      { $unwind: { path: '$catInfo', preserveNullAndEmptyArrays: true } },

      // 5. Будуємо ієрархію
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$catInfo.CAT_PARENT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'anc',
        },
      },

      // 6. Формуємо назву категорії (відразу чистимо ієрархію в рядок)
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
                      // Сортуємо рівні 0,1,2,3 всередині масиву
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

      // 7. Готуємо деталі з назвою категорії
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

      // 8. ДРУГЕ ГРУПУВАННЯ (Збираємо все під контрагента)
      {
        $group: {
          _id: '$_id.payee',
          totalMoney: { $sum: { $abs: '$catTotal' } },
          details: { $push: '$finalDetails' },
        },
      },

      // 9. Робимо масив деталей пласким (flatten)
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

      // 10. Приєднуємо ім'я контрагента в самому кінці (мінімум даних)
      {
        $lookup: {
          from: 'contragents',
          localField: '_id',
          foreignField: 'PAYEE_ID',
          as: 'payeeInfo',
        },
      },
      {
        $project: {
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

      // 11. Сортування тепер пройде в пам'яті, бо документів стало в десятки разів менше
      { $sort: { totalMoney: -1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsContragentsExpenses;
