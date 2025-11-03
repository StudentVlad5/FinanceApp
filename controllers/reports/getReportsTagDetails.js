const { Reestr } = require('../../models');

const getReportsTagDetails = async (req, res) => {
  try {
    const {
      tagId, // TG_ID (число, напр. 163) або рядок 'null'
      dateFrom,
      dateTo,
      commentSearch,
      selectedCategories,
      selectedAccounts,
      selectedContragents,
    } = req.query;

    // ----- 1. ЕТАП: Первинний $match -----
    // Фільтруємо ДО всіх складних операцій
    const primaryMatchStage = {
      RE_TRANS_RE: -1,
    };

    // Фільтр по датах
    if (dateFrom || dateTo) {
      primaryMatchStage.RE_DATE = {};
      if (dateFrom) primaryMatchStage.RE_DATE.$gte = new Date(dateFrom);
      if (dateTo) primaryMatchStage.RE_DATE.$lte = new Date(dateTo);
    }
    // Фільтр по коментарю
    if (commentSearch) {
      primaryMatchStage.RE_KOMENT = { $regex: commentSearch, $options: 'i' };
    }

    // ----- 2. ЕТАП: Ідентифікація Тегів -----
    // Цей пайплайн тепер виконується на *відфільтрованих* даних
    const tagIdentificationPipeline = [
      {
        $unwind: {
          path: '$RE_TAG',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'RE_TAG',
          foreignField: 'TG_NAME',
          as: 'tagInfo',
        },
      },
      {
        $unwind: {
          path: '$tagInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          validTagId: '$tagInfo.TG_ID', // буде 163 або null
        },
      },
      // $group, який раніше падав, тепер обробляє набагато менше даних
      {
        $group: {
          _id: '$_id', // Групуємо по ID проводки
          doc: { $first: '$$ROOT' }, // Беремо оригінальний документ
          validTagIds: { $addToSet: '$validTagId' }, // Збираємо масив [163, null]
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$doc', { validTagIds: '$validTagIds' }],
          },
        },
      },
    ];

    // ----- 3. ЕТАП: Фільтрація по Тегу -----
    const tagMatchStage = {};
    if (tagId === 'null') {
      // "Без тегу / Нерозпізнані"
      tagMatchStage.validTagIds = [null];
    } else {
      // "Конкретний тег" (переконуємось, що це число)
      tagMatchStage.validTagIds = Number(tagId);
    }

    // ----- 4. ЕТАП: Збагачення (Lookups) -----
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
    };

    // ----- 5. ЕТАП: Розрахункові Поля (AddFields) -----
    const addFieldsStage = {
      $addFields: {
        calculatedMoney: {
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
    };

    // ----- 6. ЕТАП: Вторинний $match (по розрахованих полях) -----
    const secondaryMatchStage = {};
    if (selectedCategories && selectedCategories.length > 0) {
      secondaryMatchStage.categoryName = { $in: selectedCategories };
    }
    if (selectedAccounts && selectedAccounts.length > 0) {
      secondaryMatchStage.accountName = { $in: selectedAccounts };
    }
    if (selectedContragents && selectedContragents.length > 0) {
      secondaryMatchStage.contragentName = { $in: selectedContragents };
    }

    // ----- ЗБИРАЄМО ПАЙПЛАЙН -----
    const aggregationPipeline = [
      { $match: primaryMatchStage }, // 1. Фільтруємо по датах/коментах (швидко)
      ...tagIdentificationPipeline, // 2. Ідентифікуємо теги (на малих даних)
      { $match: tagMatchStage }, // 3. Фільтруємо по тегу
      graphLookupStage, // 4. Збагачуємо
      lookupAccountStage,
      lookupContragentStage,
      addFieldsStage, // 5. Розраховуємо поля
      { $match: secondaryMatchStage }, // 6. Фільтруємо по назвах
      { $sort: { RE_DATE: -1 } },
    ];

    // .allowDiskUse(true) залишаємо про всяк випадок
    const details = await Reestr.aggregate(aggregationPipeline).allowDiskUse(
      true,
    );

    res.status(200).json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка при завантаженні деталей' });
  }
};

module.exports = getReportsTagDetails;
