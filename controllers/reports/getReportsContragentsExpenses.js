const { Reestr } = require('../../models');

const getReportsContragentsExpenses = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      {
        $match: {
          RE_TRANS_RE: { $ne: -1 },
          $expr: { $gt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      {
        $group: {
          _id: '$RE_PAYE_ID',
          totalMoney: { $sum: { $toDouble: '$RE_MONEY' } },
          details: {
            $push: {
              RE_ID: '$RE_ID',
              RE_DATE: '$RE_DATE',
              RE_CAT_ID: '$RE_CAT_ID',
              RE_KOMENT: '$RE_KOMENT',
              RE_MONEY: { $toDouble: '$RE_MONEY' },
            },
          },
        },
      },

      // Підтягуємо контрагента
      {
        $lookup: {
          from: 'contragents',
          localField: '_id',
          foreignField: 'PAYEE_ID',
          as: 'contragent',
        },
      },
      { $unwind: { path: '$contragent', preserveNullAndEmptyArrays: true } },

      // Відкриваємо деталі
      { $unwind: '$details' },

      // Рекурсивно будуємо повний шлях категорії
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$details.RE_CAT_ID',
          connectFromField: 'CAT_PARENT_ID',
          connectToField: 'CAT_ID',
          as: 'category_hierarchy',
          depthField: 'level',
        },
      },

      // Створюємо назву категорії через concat
      {
        $addFields: {
          'details.categoryName': {
            $reduce: {
              input: { $reverseArray: '$category_hierarchy' },
              initialValue: '',
              in: {
                $cond: [
                  { $eq: ['$$value', ''] },
                  '$$this.CAT_NAME',
                  { $concat: ['$$value', ' → ', '$$this.CAT_NAME'] },
                ],
              },
            },
          },
        },
      },

      // Групуємо назад по контрагенту
      {
        $group: {
          _id: '$_id',
          PAYEE_NAME: { $first: '$contragent.PAYEE_NAME' },
          totalMoney: { $first: '$totalMoney' },
          details: { $push: '$details' },
        },
      },

      { $sort: { totalMoney: -1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsContragentsExpenses;
