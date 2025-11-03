const { Reestr } = require('../../models');

const getReportsByTagsSummary = async (req, res) => {
  // --- Логіка розрахунку суми з курсом (ваша логіка) ---
  const calculatedMoneyLogic = {
    $let: {
      vars: {
        money: { $toDouble: '$RE_MONEY' },
        kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
      },
      in: {
        $cond: {
          if: { $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }] },
          then: { $multiply: ['$$money', '$$kurs'] },
          else: '$$money',
        },
      },
    },
  };

  try {
    const aggregatedData = await Reestr.aggregate([
      // 1. Початковий $match по Reestr
      {
        $match: {
          RE_TRANS_RE: -1,
        },
      },
      // 2. Додаємо поле з курсом
      {
        $addFields: {
          calculatedMoney: calculatedMoneyLogic,
        },
      },
      // 3. Розгортаємо масив тегів (назв)
      // preserveNullAndEmptyArrays: true - щоб зберегти проводки БЕЗ тегів
      {
        $unwind: {
          path: '$RE_TAG',
          preserveNullAndEmptyArrays: true,
        },
      },
      // 4. Шукаємо ВАЛІДНИЙ тег у колекції 'tags'
      // Ми шукаємо по 'RE_TAG' (який є назвою, напр. "Невод" або "евод")
      // у полі 'TG_NAME' колекції 'tags'
      {
        $lookup: {
          from: 'tags', // Колекція "source of truth" для тегів
          localField: 'RE_TAG', // Назва тегу з Reestr
          foreignField: 'TG_NAME', // Назва тегу з Tags
          as: 'tagInfo',
        },
      },
      // 5. Розгортаємо результат $lookup.
      // - Якщо 'RE_TAG' був 'Невод', 'tagInfo' буде { ... TG_NAME: "Невод" }
      // - Якщо 'RE_TAG' був 'евод', 'tagInfo' буде []
      // - Якщо 'RE_TAG' був null, 'tagInfo' буде []
      {
        $unwind: {
          path: '$tagInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      // 6. Групуємо по ID валідного тегу
      // - 'Невод' групується по 'tagInfo.TG_ID' (напр. 163)
      // - 'евод' групується по _id: null (бо 'tagInfo' не знайдено)
      // - Проводки без тегу групуються по _id: null (бо 'RE_TAG' був null)
      {
        $group: {
          _id: '$tagInfo.TG_ID', // Групуємо по ID, це найнадійніше!
          tagName: { $first: '$tagInfo.TG_NAME' }, // Беремо валідну назву
          totalIncome: {
            $sum: {
              $cond: [{ $gt: ['$calculatedMoney', 0] }, '$calculatedMoney', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $lt: ['$calculatedMoney', 0] }, '$calculatedMoney', 0],
            },
          },
        },
      },
      // 7. Форматуємо
      {
        $project: {
          _id: '$_id', // _id тепер TG_ID (або null)
          // Якщо 'tagName' 'null' (це буде для групи _id: null),
          // ми називаємо її "Без тегу / Нерозпізнані"
          tagName: { $ifNull: ['$tagName', 'Без тегу / Нерозпізнані'] },
          totalIncome: 1,
          totalExpense: 1,
        },
      },
      // 8. Сортуємо
      { $sort: { totalIncome: -1 } },
    ]);

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsByTagsSummary;
