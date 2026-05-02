const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');
const { Account } = require('../../models');
const { ExchangeRate } = require('../../models');

// const createReestr = async (req, res, next) => {
//   const body = req.body;
//   let { RE_ID } = body;

//   // 1. Отримуємо чисті значення для розрахунків
//   const moneyAtStart = Number(body.RE_MONEY) || 0;
//   const moneyAtEnd = Number(body.RE_MONEY_2); // Сума, яка має "приземлитися" на рахунок Б
//   const sumBase = Number(body.RE_SUM) || moneyAtStart;
//   const schId = Number(body.RE_SCH_ID);
//   const transSchId = body.RE_TRANS_SCH_ID ? Number(body.RE_TRANS_SCH_ID) : -1;

//   // Валідація тегів (якщо вони прийшли масивом)
//   let tags = Array.isArray(body.RE_TAG) ? body.RE_TAG.join(', ') : body.RE_TAG;

//   if (!RE_ID) RE_ID = Date.now();

//   try {
//     // ЛОГІКА: Звичайний запис (Дохід/Витрата)
//     if (transSchId === -1 || transSchId === '-1') {
//       const { RE_MONEY_2, ...cleanData } = body;
//       const result = await Reestr.create({
//         ...cleanData,
//         RE_ID,
//         RE_TAG: tags,
//         RE_TRANS_SCH_ID: -1,
//         RE_TRANS_RE: -1,
//       });
//       return res.status(200).json(result);
//     }

//     // ЛОГІКА: ПЕРЕКАЗ (дві проводки)
//     // 1-ша проводка: Списання з рахунку А
//     const record1 = await Reestr.create({
//       RE_DATE: body.RE_DATE,
//       RE_KOMENT: body.RE_KOMENT,
//       RE_SCH_ID: schId,
//       RE_MONEY: moneyAtStart,
//       RE_SUM: sumBase,
//       RE_KURS: body.RE_KURS || 1,
//       RE_TAG: tags,
//       RE_TRANS_SCH_ID: transSchId,
//       RE_TRANS_RE: RE_ID + 1,
//       RE_ID: RE_ID,
//       RE_PAYE_ID: body.RE_PAYE_ID || 1,
//     });

//     // 2-га проводка: Зарахування на рахунок Б
//     // Використовуємо RE_MONEY_2 лише для обчислення RE_MONEY другого запису
//     await Reestr.create({
//       RE_DATE: body.RE_DATE,
//       RE_KOMENT: body.RE_KOMENT,
//       RE_SCH_ID: transSchId,
//       RE_MONEY: -moneyAtEnd, // Значення з "транспортного" поля фронта
//       RE_SUM: -sumBase,
//       RE_KURS: body.RE_KURS || 1,
//       RE_TAG: tags,
//       RE_TRANS_SCH_ID: schId,
//       RE_TRANS_RE: RE_ID,
//       RE_ID: RE_ID + 1,
//       RE_PAYE_ID: body.RE_PAYE_ID || 1,
//     });

//     res.status(200).json(record1);
//   } catch (err) {
//     next(new ValidationError(err.message));
//   }
// };

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
    const getUahSum = async (sId, sum) => {
      const account = await Account.findOne({ SCH_ID: sId });
      if (!account || account.SCH_CUR === '980') return sum;

      const rateEntry = await ExchangeRate.findOne({
        date: body.RE_DATE,
        currency_code: account.SCH_CUR,
      });
      return sum * (rateEntry ? rateEntry.rate : 1);
    };

    // 1. ЛОГІКА: Звичайний запис
    if (transSchId === -1 || transSchId === '-1') {
      const uahSum = await getUahSum(schId, sumBase);
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
    const uahSumA = await getUahSum(schId, sumBase);
    const uahSumB = await getUahSum(transSchId, -sumBase);

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
