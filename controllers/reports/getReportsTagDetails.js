const { Reestr } = require('../../models');

// (Залишаємо 'toArray' на випадок, якщо він потрібен іншим функціям)
const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getReportsTagDetails = async (req, res) => {
  try {
    const {
      tagId, // TG_ID (число, напр. 163) або рядок 'null'
      dateFrom,
      dateTo, // ❗️ ВИДАЛЕНО: commentSearch, selectedCategories, selectedAccounts, selectedContragents
    } = req.query; // ----- 1. ЕТАП: Первинний $match (ШВИДКИЙ) ----- // Залишаємо лише базовий фільтр

    const primaryMatchStage = {
      RE_TRANS_RE: -1,
    }; // ❗️ ВИДАЛЕНО: Вся логіка фільтрації по ID (catIDs, accIDs, conIDs) та commentSearch // ----- 2. ЕТАП: Ідентифікація Тегів (без змін) -----
    const tagIdentificationPipeline = [
      { $unwind: { path: '$RE_TAG', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'tags',
          localField: 'RE_TAG',
          foreignField: 'TG_NAME',
          as: 'tagInfo',
        },
      },
      { $unwind: { path: '$tagInfo', preserveNullAndEmptyArrays: true } },
      { $addFields: { validTagId: '$tagInfo.TG_ID' } },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          validTagIds: { $addToSet: '$validTagId' },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ['$doc', { validTagIds: '$validTagIds' }] },
        },
      },
    ]; // ----- 3. ЕТАП: Фільтрація по Тегу (без змін) -----

    const tagMatchStage = {};
    if (tagId === 'null') {
      tagMatchStage.validTagIds = [null];
    } else {
      tagMatchStage.validTagIds = Number(tagId);
    } // ----- 4. ЕТАП: Збагачення (Lookups) (без змін) ----- // (Вони потрібні, щоб фронтенд міг фільтрувати по іменах)

    const graphLookupStage = {
      $graphLookup: {
        from: 'categories',
        startWith: '$RE_CAT_ID',
        connectFromField: 'CAT_PARENT_ID',
        connectToField: 'CAT_ID',
        as: 'category_hierarchy',
      },
    };
    const lookupAccountStage = {
      $lookup: {
        from: 'accounts',
        localField: 'RE_SCH_ID',
        foreignField: 'SCH_ID',
        as: 'accountInfo',
      },
    };
    const lookupContragentStage = {
      $lookup: {
        from: 'contragents',
        localField: 'RE_PAYE_ID',
        foreignField: 'PAYEE_ID',
        as: 'contragentInfo',
      },
    }; // ----- 5. ЕТАП: Розрахункові Поля (AddFields) (без змін) ----- // (Потрібні 'calculatedMoney', 'categoryName', 'accountName', 'contragentName')

    const addFieldsStage = {
      $addFields: {
        calculatedMoney: {
          $let: {
            vars: {
              money: {
                $convert: {
                  input: '$RE_MONEY',
                  to: 'double',
                  onError: 0.0,
                  onNull: 0.0,
                },
              },
              kurs: {
                $convert: {
                  input: '$RE_KURS',
                  to: 'double',
                  onError: 1.0,
                  onNull: 1.0,
                },
              },
            },
            in: {
              $cond: {
                if: { $and: [{ $ne: ['$$kurs', 1] }, { $ne: ['$$kurs', 0] }] },
                then: { $multiply: ['$$money', '$$kurs'] },
                else: '$$money',
              },
            },
          },
        },
        categoryName: {
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
        accountName: {
          $ifNull: [{ $arrayElemAt: ['$accountInfo.SCH_NAME', 0] }, 'N/A'],
        },
        contragentName: {
          $ifNull: [{ $arrayElemAt: ['$contragentInfo.PAYEE_NAME', 0] }, 'N/A'],
        },
      },
    }; // ----- ЗБИРАЄМО ПАЙПЛАЙН -----

    const aggregationPipeline = [
      { $match: primaryMatchStage }, // 1.
    ]; // ----- ЕТАП ФІЛЬТРАЦІЇ ПО ДАТАХ (залишається на бекенді) -----

    aggregationPipeline.push({
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
      aggregationPipeline.push({
        $match: { convertedDate: dateMatchFilter },
      });
    } // ----- КІНЕЦЬ ЕТАПУ ФІЛЬТРАЦІЇ ПО ДАТАХ ----- // Додаємо решту пайплайну
    aggregationPipeline.push(
      ...tagIdentificationPipeline, // 2.
      { $match: tagMatchStage }, // 3.
      graphLookupStage, // 4.
      lookupAccountStage,
      lookupContragentStage,
      addFieldsStage, // 5. // { $sort } -- видалено
    ); // ----- ВИКОНАННЯ -----

    const details = await Reestr.aggregate(aggregationPipeline);

    res.status(200).json(details);
  } catch (err) {
    console.error('Помилка при завантаженні деталей:', err);
    res.status(500).json({ message: 'Помилка при завантаженні деталей' });
  }
};

module.exports = getReportsTagDetails;
