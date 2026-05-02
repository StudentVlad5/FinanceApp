const { Reestr } = require('../../models');

const getReportsTagDetails = async (req, res) => {
  try {
    const { tagId, dateFrom, dateTo } = req.query;

    // ----- 1. ЕТАП: Первинний $match -----
    const primaryMatchStage = {
      RE_TRANS_RE: -1,
    };

    // ----- 2. ЕТАП: Ідентифікація Тегів -----
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
      {
        $addFields: {
          validTagId: { $ifNull: ['$tagInfo.TG_ID', 'no-tag'] },
        },
      },
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
    ];

    // ----- 3. ЕТАП: Фільтрація по Тегу -----
    const tagMatchStage = {};
    if (tagId === 'null' || tagId === 'no-tag') {
      tagMatchStage.validTagIds = 'no-tag';
    } else {
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

    // ----- 5. ЕТАП: Розрахункові Поля (Використовуємо RE_SUM_UAH) -----
    const addFieldsStage = {
      $addFields: {
        // Замість складного $multiply використовуємо готове поле RE_SUM_UAH
        calculatedMoney: {
          $convert: {
            input: '$RE_SUM_UAH',
            to: 'double',
            onError: 0.0,
            onNull: 0.0,
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

    // ----- ЗБИРАЄМО ПАЙПЛАЙН -----
    const aggregationPipeline = [{ $match: primaryMatchStage }];

    // Фільтрація по датах
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
    }

    aggregationPipeline.push(
      ...tagIdentificationPipeline,
      { $match: tagMatchStage },
      graphLookupStage,
      lookupAccountStage,
      lookupContragentStage,
      addFieldsStage,
    );

    const details = await Reestr.aggregate(aggregationPipeline);

    res.status(200).json(details);
  } catch (err) {
    console.error('Помилка при завантаженні деталей:', err);
    res.status(500).json({ message: 'Помилка при завантаженні деталей' });
  }
};

module.exports = getReportsTagDetails;
