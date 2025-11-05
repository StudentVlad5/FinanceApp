const { Reestr } = require('../../models');

const getReportsContragentsIncome = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      {
        $match: {
          RE_TRANS_RE: -1,
          $expr: { $gt: [{ $toDouble: '$RE_MONEY' }, 0] },
        },
      },

      // Розрахунок суми з урахуванням курсу
      {
        $addFields: {
          calculatedMoney: {
            // Створюємо нове поле
            $let: {
              vars: {
                money: { $toDouble: '$RE_MONEY' },
                // Безпечно конвертуємо RE_KURS.
                // $ifNull обробляє null/відсутні поля, $toDouble - рядки/числа.
                // Якщо RE_KURS немає, він буде 1.
                kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
              },
              in: {
                $cond: {
                  // Множимо, ТІЛЬКИ ЯКЩО kurs не 1 і не 0
                  if: {
                    $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }],
                  },
                  then: { $multiply: ['$$money', '$$kurs'] },
                  else: '$$money', // Інакше, беремо оригінальну суму
                },
              },
            },
          },
        },
      },

      {
        $group: {
          _id: '$RE_PAYE_ID',
          totalMoney: { $sum: { $abs: '$calculatedMoney' } },
          details: {
            $push: {
              RE_ID: '$RE_ID',
              RE_DATE: '$RE_DATE',
              RE_CAT_ID: '$RE_CAT_ID',
              RE_KOMENT: '$RE_KOMENT',
              RE_SCH_ID: '$RE_SCH_ID',
              RE_MONEY: '$calculatedMoney',
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

module.exports = getReportsContragentsIncome;
