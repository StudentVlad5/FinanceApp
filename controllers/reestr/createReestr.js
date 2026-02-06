const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const createReestr = async (req, res, next) => {
  let { RE_ID, RE_TAG } = req.body;
  const {
    RE_SCH_ID,
    RE_DATE = Date.now(),
    RE_KOMENT,
    RE_PAYE_ID,
    RE_CAT_ID = 0,
    RE_MONEY,
    RE_SUM = 0,
    RE_MONEY_2, // Нове поле з фронта для крос-курсів
    RE_INCR = 0,
    RE_TRANS_RE = -1,
    RE_TRANS_SCH_ID,
    RE_KURS = 1,
    RE_KVO,
    RE_TAS_ID,
    RE_CLEAR,
    RE_USER,
    RE_ATTACH,
  } = req.body;

  // Валідація унікальності RE_ID
  if (Array.isArray(RE_TAG)) {
    RE_TAG = RE_TAG.join(', ');
  }

  let isDuplicate = true;
  while (isDuplicate) {
    const existing = await Reestr.findOne({ RE_ID });
    if (!existing) {
      isDuplicate = false;
    } else {
      RE_ID += 1;
    }
  }

  try {
    // 1. Сценарій: Звичайний запис (не переказ)
    if (
      RE_TRANS_SCH_ID === -1 ||
      RE_TRANS_SCH_ID === '-1' ||
      !RE_TRANS_SCH_ID
    ) {
      const createNewReestr = await Reestr.create({
        RE_ID,
        RE_SCH_ID,
        RE_DATE,
        RE_KOMENT,
        RE_PAYE_ID,
        RE_CAT_ID,
        RE_MONEY,
        RE_SUM,
        RE_INCR,
        RE_TRANS_RE: -1,
        RE_TRANS_SCH_ID: -1,
        RE_KURS,
        RE_TAG,
        RE_KVO,
        RE_TAS_ID,
        RE_CLEAR,
        RE_USER,
        RE_ATTACH,
      });
      return res.status(200).json(createNewReestr);
    }

    // 2. Сценарій: ПЕРЕКАЗ (дві проводки)
    // Створюємо перший запис
    const createNewReestr_1 = await Reestr.create({
      RE_ID,
      RE_SCH_ID,
      RE_DATE,
      RE_KOMENT,
      RE_PAYE_ID,
      RE_CAT_ID,
      RE_MONEY,
      RE_SUM,
      RE_INCR,
      RE_TRANS_RE: RE_ID + 1,
      RE_TRANS_SCH_ID,
      RE_KURS,
      RE_TAG,
      RE_KVO,
      RE_TAS_ID,
      RE_CLEAR,
      RE_USER,
      RE_ATTACH,
    });

    // Розрахунок суми для другого рахунку
    let finalMoney2;
    if (RE_MONEY_2 !== undefined && RE_MONEY_2 !== null) {
      // Пріоритет ручного введення з фронта (для крос-курсів USD-EUR)
      finalMoney2 = Number(RE_MONEY_2);
    } else {
      // Автоматичний розрахунок (ГРН-ВАЛЮТА)
      const kurs = Number(RE_KURS) || 1;
      const primaryMoney = Number(RE_MONEY);
      const primarySum = Number(RE_SUM);

      if (Math.abs(primaryMoney) === Math.abs(primarySum)) {
        finalMoney2 = primarySum / kurs; // Грн -> Валюта
      } else {
        finalMoney2 = primarySum; // Валюта -> Грн
      }
    }

    const createNewReestr_2 = await Reestr.create({
      RE_ID: createNewReestr_1.RE_TRANS_RE,
      RE_SCH_ID: RE_TRANS_SCH_ID,
      RE_DATE,
      RE_KOMENT,
      RE_PAYE_ID,
      RE_CAT_ID,
      RE_MONEY: -finalMoney2,
      RE_SUM: -Number(RE_SUM),
      RE_INCR,
      RE_TRANS_RE: createNewReestr_1.RE_ID,
      RE_TRANS_SCH_ID: createNewReestr_1.RE_SCH_ID,
      RE_KURS,
      RE_TAG,
      RE_KVO,
      RE_TAS_ID: RE_PAYE_ID,
      RE_CLEAR,
      RE_USER,
      RE_ATTACH,
    });

    res.status(200).json(createNewReestr_1);
  } catch (err) {
    console.error('Create Reestr Error:', err);
    next(new ValidationError('Bad request (invalid request body)'));
  }
};

module.exports = createReestr;
