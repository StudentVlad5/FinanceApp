const { Reestr } = require('../../models');

const getReportsCategoriesExpenses = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Фільтрація операцій
      {
        $match: {
          RE_TRANS_RE: -1,
        },
      },

      // 2. Розрахунок грошей (toDouble обов'язково, бо в реєстрі це String "-8465")
      {
        $addFields: {
          calculatedMoney: {
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

      // 3. Lookup Рахунків (Пряме порівняння чисел)
      {
        $lookup: {
          from: 'accounts',
          localField: 'RE_SCH_ID', // Число в Reestr
          foreignField: 'SCH_ID', // Число в Accounts
          as: 'accountData',
        },
      },

      // 4. Lookup Контрагентів (Також перевірте, якщо PAYEE_ID число - лишаємо так)
      {
        $lookup: {
          from: 'contragents',
          localField: 'RE_PAYE_ID',
          foreignField: 'PAYEE_ID',
          as: 'payeeData',
        },
      },

      // 5. Lookup Категорій
      {
        $lookup: {
          from: 'categories',
          localField: 'RE_CAT_ID',
          foreignField: 'CAT_ID',
          as: 'cat',
        },
      },
      { $unwind: '$cat' },
      { $match: { 'cat.CAT_TYPE_PROFITABLE': false } },

      // 6. ГРУПУВАННЯ
      {
        $group: {
          _id: '$RE_CAT_ID',
          categoryName: { $first: '$cat.CAT_NAME' },
          parentID: { $first: '$cat.CAT_PARENT_ID' },
          level: { $first: '$cat.CAT_LEVEL' },
          totalSum: { $sum: '$calculatedMoney' },
          operations: {
            $push: {
              RE_DATE: '$RE_DATE',
              RE_KOMENT: '$RE_KOMENT',
              RE_MONEY: '$calculatedMoney',
              ACC_NAME: {
                $ifNull: [
                  { $arrayElemAt: ['$accountData.SCH_NAME', 0] },
                  'Невідомий рахунок',
                ],
              },
              PAYEE_NAME: {
                $ifNull: [
                  { $arrayElemAt: ['$payeeData.PAYEE_NAME', 0] },
                  '---',
                ],
              },
            },
          },
        },
      },

      { $sort: { categoryName: 1 } },
    ]).allowDiskUse(true);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};
module.exports = getReportsCategoriesExpenses;
