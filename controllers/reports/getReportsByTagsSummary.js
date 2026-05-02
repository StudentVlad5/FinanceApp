const { Reestr } = require('../../models');

// 🔧 Допоміжна функція
const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

// const getReportsByTagsSummary = async (req, res) => {
//   // --- 1. Отримання фільтрів ---
//   const {
//     dateFrom,
//     dateTo,
//     selectedCategories,
//     selectedAccounts,
//     selectedContragents,
//   } = req.query; // --- 2. Побудова пайплайну ---

//   const pipeline = []; // --- Етап 1: Базовий $match (по індексованим полям) ---

//   const initialMatchFilter = {
//     RE_TRANS_RE: -1,
//   }; // --- Фільтри по ID ---

//   const catIDs = toArray(selectedCategories);
//   if (catIDs.length > 0) {
//     // ❗️ ВИПРАВЛЕНО: Додаємо до 'initialMatchFilter', а не 'matchFilter'
//     initialMatchFilter.RE_CAT_ID = { $in: catIDs };
//   }
//   const accIDs = toArray(selectedAccounts);
//   if (accIDs.length > 0) {
//     initialMatchFilter.RE_SCH_ID = { $in: accIDs };
//   }
//   const conIDs = toArray(selectedContragents);
//   if (conIDs.length > 0) {
//     initialMatchFilter.RE_PAYEE_ID = { $in: conIDs };
//   }

//   pipeline.push({ $match: initialMatchFilter }); // --- Етап 2: "Безпечна" Конвертація дати --- // ❗️ ВИПРАВЛЕНО: Використовуємо $dateFromString для обробки ""

//   pipeline.push({
//     $addFields: {
//       convertedDate: {
//         $dateFromString: {
//           dateString: '$RE_DATE',
//           format: '%Y-%m-%d', // Ваш формат YYYY-MM-DD
//           onError: null, // Якщо помилка (e.g., ""), повернути null
//         },
//       },
//     },
//   }); // --- Етап 3: Фільтрація по датах ---

//   const dateMatchFilter = {};
//   if (dateFrom) {
//     dateMatchFilter.$gte = new Date(dateFrom + 'T00:00:00.000Z');
//   }
//   if (dateTo) {
//     const endDate = new Date(dateTo + 'T00:00:00.000Z');
//     endDate.setUTCDate(endDate.getUTCDate() + 1);
//     dateMatchFilter.$lt = endDate;
//   }

//   if (Object.keys(dateMatchFilter).length > 0) {
//     pipeline.push({
//       // Фільтруємо ті, що не null, І потрапляють в діапазон
//       $match: { convertedDate: dateMatchFilter },
//     });
//   } // --- Решта вашого пайплайну (без змін) --- // Етап 4: Додаємо поле з курсом

//   const calculatedMoneyLogic = {
//     $let: {
//       vars: {
//         money: { $toDouble: '$RE_MONEY' },
//         kurs: { $ifNull: [{ $toDouble: '$RE_KURS' }, 1] },
//       },
//       in: {
//         $cond: {
//           if: { $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }] },
//           then: { $multiply: ['$$money', '$$kurs'] },
//           else: '$$money',
//         },
//       },
//     },
//   };
//   pipeline.push({
//     $addFields: {
//       calculatedMoney: calculatedMoneyLogic,
//     },
//   }); // Етап 5: Розгортаємо теги

//   pipeline.push({
//     $unwind: { path: '$RE_TAG', preserveNullAndEmptyArrays: true },
//   }); // Етап 6: $lookup тегів

//   pipeline.push({
//     $lookup: {
//       from: 'tags',
//       localField: 'RE_TAG',
//       foreignField: 'TG_NAME',
//       as: 'tagInfo',
//     },
//   }); // Етап 7: $unwind тегів

//   pipeline.push({
//     $unwind: { path: '$tagInfo', preserveNullAndEmptyArrays: true },
//   }); // Етап 8: $group по тегах

//   pipeline.push({
//     $group: {
//       // ❗️ ВИПРАВЛЕНО: Якщо TG_ID немає, використовуємо спеціальну мітку "no-tag"
//       _id: { $ifNull: ['$tagInfo.TG_ID', 'no-tag'] },
//       tagName: { $first: '$tagInfo.TG_NAME' },
//       totalIncome: {
//         $sum: {
//           $cond: [{ $gt: ['$calculatedMoney', 0] }, '$calculatedMoney', 0],
//         },
//       },
//       totalExpense: {
//         $sum: {
//           $cond: [{ $lt: ['$calculatedMoney', 0] }, '$calculatedMoney', 0],
//         },
//       },
//     },
//   });

//   // Етап 9: $project
//   pipeline.push({
//     $project: {
//       _id: 1,
//       // ❗️ ВИПРАВЛЕНО: Якщо ми завантажили 'no-tag', даємо зрозумілу назву
//       tagName: {
//         $cond: {
//           if: { $eq: ['$_id', 'no-tag'] },
//           then: 'Без тегу',
//           else: { $ifNull: ['$tagName', 'Нерозпізнаний тег'] },
//         },
//       },
//       totalIncome: 1,
//       totalExpense: 1,
//     },
//   }); // Етап 10: $sort

//   pipeline.push({ $sort: { totalIncome: -1 } }); // --- Виконання ---

//   try {
//     const aggregatedData = await Reestr.aggregate(pipeline);
//     res.status(200).json(aggregatedData);
//   } catch (err) {
//     console.error('Помилка в пайплайні агрегації:', err);
//     res.status(500).json({ message: 'Помилка при обробці даних' });
//   }
// };

const getReportsByTagsSummary = async (req, res) => {
  const {
    dateFrom,
    dateTo,
    selectedCategories,
    selectedAccounts,
    selectedContragents,
  } = req.query;

  const pipeline = [];

  // --- Етап 1: Базовий $match ---
  const initialMatchFilter = {
    RE_TRANS_RE: -1,
  };

  const catIDs = toArray(selectedCategories);
  if (catIDs.length > 0) {
    initialMatchFilter.RE_CAT_ID = { $in: catIDs.map(Number) };
  }
  const accIDs = toArray(selectedAccounts);
  if (accIDs.length > 0) {
    initialMatchFilter.RE_SCH_ID = { $in: accIDs.map(Number) };
  }
  const conIDs = toArray(selectedContragents);
  if (conIDs.length > 0) {
    initialMatchFilter.RE_PAYEE_ID = { $in: conIDs.map(Number) };
  }

  pipeline.push({ $match: initialMatchFilter });

  // --- Етап 2: Конвертація дати для фільтрації ---
  pipeline.push({
    $addFields: {
      convertedDate: {
        $dateFromString: {
          dateString: '$RE_DATE',
          format: '%Y-%m-%d',
          onError: null,
        },
      },
    },
  });

  // --- Етап 3: Фільтрація за датами ---
  const dateMatchFilter = {};
  if (dateFrom) {
    dateMatchFilter.$gte = new Date(dateFrom + 'T00:00:00.000Z');
  }
  if (dateTo) {
    const endDate = new Date(dateTo + 'T00:00:00.000Z');
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    dateMatchFilter.$lt = endDate;
  }

  if (Object.keys(dateMatchFilter).length > 0) {
    pipeline.push({ $match: { convertedDate: dateMatchFilter } });
  }

  // --- Етап 4: Підготовка числового значення з RE_SUM_UAH ---
  pipeline.push({
    $addFields: {
      calculatedMoneyUah: {
        $convert: {
          input: '$RE_SUM_UAH',
          to: 'double',
          onError: 0.0,
          onNull: 0.0,
        },
      },
    },
  });

  // --- Етап 5-7: Робота з тегами ---
  pipeline.push({
    $unwind: { path: '$RE_TAG', preserveNullAndEmptyArrays: true },
  });

  pipeline.push({
    $lookup: {
      from: 'tags',
      localField: 'RE_TAG',
      foreignField: 'TG_NAME',
      as: 'tagInfo',
    },
  });

  pipeline.push({
    $unwind: { path: '$tagInfo', preserveNullAndEmptyArrays: true },
  });

  // --- Етап 8: Групування за тегами ---
  pipeline.push({
    $group: {
      _id: { $ifNull: ['$tagInfo.TG_ID', 'no-tag'] },
      tagName: { $first: '$tagInfo.TG_NAME' },
      totalIncome: {
        $sum: {
          $cond: [
            { $gt: ['$calculatedMoneyUah', 0] },
            '$calculatedMoneyUah',
            0,
          ],
        },
      },
      totalExpense: {
        $sum: {
          $cond: [
            { $lt: ['$calculatedMoneyUah', 0] },
            '$calculatedMoneyUah',
            0,
          ],
        },
      },
    },
  });

  // --- Етап 9: Форматування результату ---
  pipeline.push({
    $project: {
      _id: 1,
      tagName: {
        $cond: {
          if: { $eq: ['$_id', 'no-tag'] },
          then: 'Без тегу',
          else: { $ifNull: ['$tagName', 'Нерозпізнаний тег'] },
        },
      },
      totalIncome: 1,
      totalExpense: 1,
    },
  });

  // --- Етап 10: Сортування ---
  pipeline.push({ $sort: { totalIncome: -1 } });

  try {
    const aggregatedData = await Reestr.aggregate(pipeline);
    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error('Помилка в пайплайні агрегації тегів:', err);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};

module.exports = getReportsByTagsSummary;
