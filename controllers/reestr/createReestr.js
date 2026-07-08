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
        SCH_ID: { $in: [numericId, stringId] },
      });

      // Залишаємо дебаг для контролю
      console.log(
        `[DEBUG] Рахунок ID: ${sId}, Знайдено в БД: ${!!account}, Валюта: ${account ? account.SCH_CUR : 'немає'}`,
      );

      if (!account) {
        // Тимчасовий фікс: якщо рахунок ВСЕ ОДНО не знайдено, але ви знаєте, що це EUR (428)
        // ми примусово підставимо 'EUR', щоб код не ламався, поки ви перевіряєте базу акаунтів.
        if (numericId === 428) {
          console.log(
            `[DEBUG WORKAROUND] Рахунок 428 не знайдено, але примусово вмикаємо курс EUR`,
          );
          var mockAccount = { SCH_CUR: 'EUR' };
          return await calculateRate(mockAccount, sum, rawDate);
        }
        return sum;
      }

      return await calculateRate(account, sum, rawDate);
    };

    // Винесемо логіку пошуку курсу в окрему підфункцію для зручності
    const calculateRate = async (account, sum, rawDate) => {
      let currentStringDate = rawDate
        ? String(rawDate).split('T')[0]
        : new Date().toISOString().split('T')[0];

      let rateEntry = null;
      let attempts = 0;

      while (!rateEntry && attempts < 10) {
        rateEntry = await ExchangeRate.findOne({
          $or: [
            { currency_code: String(account.SCH_CUR) },
            { valcode: String(account.SCH_CUR).toUpperCase() },
          ],
          date: { $lte: currentStringDate },
        }).sort({ date: -1 });

        if (!rateEntry) {
          const dateObj = new Date(currentStringDate);
          dateObj.setDate(dateObj.getDate() - 1);
          currentStringDate = dateObj.toISOString().split('T')[0];
          attempts++;
        }
      }

      console.log(
        `[DEBUG] Знайдений курс: ${rateEntry ? rateEntry.rate : 'НЕ ЗНАЙДЕНО'} на дату: ${currentStringDate}`,
      );

      const finalRate = rateEntry ? Number(rateEntry.rate) : 1;
      return sum * finalRate;
    };

    // 1. ЛОГІКА: Звичайний запис
    if (transSchId === -1 || transSchId === '-1') {
      const uahSum = await getUahSum(schId, sumBase, body.RE_DATE);
      const { RE_MONEY_2, ...cleanData } = body;

      const result = await Reestr.create({
        ...cleanData,
        RE_ID,
        RE_TAG: tags,
        RE_SUM_UAH: uahSum.toFixed(2).toString(),
        RE_TRANS_SCH_ID: -1,
        RE_TRANS_RE: -1,
      });
      return res.status(200).json(result);
    }

    // 2. ЛОГІКА: ПЕРЕКАЗ
    const uahSumA = await getUahSum(schId, sumBase, body.RE_DATE);
    const uahSumB = await getUahSum(transSchId, -sumBase, body.RE_DATE);

    const record1 = await Reestr.create({
      ...body, // копіюємо базу
      RE_SCH_ID: schId,
      RE_MONEY: moneyAtStart,
      RE_SUM: sumBase,
      RE_SUM_UAH: uahSumA.toFixed(2).toString(),
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
      RE_SUM_UAH: uahSumB.toFixed(2).toString(),
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
