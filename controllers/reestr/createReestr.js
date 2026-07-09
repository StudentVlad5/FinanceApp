const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');
const { Account } = require('../../models');
const { ExchangeRate } = require('../../models');

const createReestr = async (req, res, next) => {
  const body = req.body;
  let { RE_ID } = body;

  const moneyAtStart = Number(body.RE_MONEY) || 0;
  const moneyAtEnd = Number(body.RE_MONEY_2);
  const sumBase =
    Number(body.RE_SUM) !== 0 ? Number(body.RE_SUM) : Number(body.RE_MONEY);
  const schId = Number(body.RE_SCH_ID);
  const transSchId = body.RE_TRANS_SCH_ID ? Number(body.RE_TRANS_SCH_ID) : -1;
  let tags = Array.isArray(body.RE_TAG) ? body.RE_TAG.join(', ') : body.RE_TAG;

  if (!RE_ID) RE_ID = Date.now();

  try {
    // Вспоміжна функція для отримання суми в грн
    const getUahSum = async (sId, sum, rawDate) => {
      // Перетворюємо ID в чисте число та чистий рядок
      const numericId = Number(sId);
      const stringId = String(sId);

      // Шукаємо за допомогою $in, щоб Mongoose пропустив обидва типи через схему
      const account = await Account.findOne({
        $expr: {
          $eq: [{ $toString: '$SCH_ID' }, String(sId)],
        },
      });

      // Залишаємо дебаг для контролю
      console.log(
        `[DEBUG] Рахунок ID: ${sId}, Знайдено в БД: ${!!account}, Валюта: ${account ? account.SCH_CUR : 'немає'}`,
      );

      return await calculateRate(account, sum, rawDate);
    };

    // Винесемо логіку пошуку курсу в окрему підфункцію для зручності
    const calculateRate = async (account, sum, rawDate) => {
      if (!account) {
        return {
          rate: 1,
          sumUah: sum,
        };
      }

      let currentStringDate = rawDate
        ? String(rawDate).split('T')[0]
        : new Date().toISOString().split('T')[0];

      const rateEntry = await ExchangeRate.findOne({
        $or: [
          { currency_code: String(account.SCH_CUR) },
          { valcode: String(account.SCH_CUR).toUpperCase() },
        ],
        date: { $lte: currentStringDate },
      }).sort({ date: -1 });

      const rate = rateEntry ? Number(rateEntry.rate) : 1;

      return {
        rate,
        sumUah: Number(sum) * rate,
      };
    };

    // 1. ЛОГІКА: Звичайний запис
    if (transSchId === -1 || transSchId === '-1') {
      // const uahSum = await getUahSum(schId, sumBase, body.RE_DATE);
      const { RE_MONEY_2, ...cleanData } = body;
      const resultRate = await getUahSum(schId, sumBase, body.RE_DATE);
      const result = await Reestr.create({
        ...cleanData,
        RE_ID,
        RE_TAG: tags,
        RE_KURS: resultRate.rate,
        RE_SUM_UAH: resultRate.sumUah.toFixed(2),
        RE_TRANS_SCH_ID: -1,
        RE_TRANS_RE: -1,
      });
      return res.status(200).json(result);
    }

    // 2. ЛОГІКА: ПЕРЕКАЗ
    const rateA = await getUahSum(schId, sumBase, body.RE_DATE);
    const rateB = await getUahSum(transSchId, -sumBase, body.RE_DATE);

    const record1 = await Reestr.create({
      ...body, // копіюємо базу
      RE_SCH_ID: schId,
      RE_MONEY: moneyAtStart,
      RE_SUM: sumBase,
      RE_KURS: rateA.rate,
      RE_SUM_UAH: rateA.sumUah.toFixed(2),
      RE_TRANS_SCH_ID: transSchId,
      RE_TRANS_RE: RE_ID + 1,
      RE_ID: RE_ID,
      RE_TAG: tags,
    });

    await Reestr.create({
      ...body,
      RE_SCH_ID: transSchId,
      RE_MONEY: -moneyAtEnd,
      RE_SUM: -sumBase,
      RE_KURS: rateB.rate,
      RE_SUM_UAH: rateB.sumUah.toFixed(2),
      RE_TRANS_SCH_ID: schId,
      RE_TRANS_RE: RE_ID,
      RE_ID: RE_ID + 1,
      RE_TAG: tags,
    });

    res.status(200).json(record1);
  } catch (err) {
    next(new ValidationError(err.message));
  }
};

module.exports = createReestr;
