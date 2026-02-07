const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const createReestr = async (req, res, next) => {
  let { RE_ID } = req.body;
  const body = req.body;

  // Приведення числових полів (важливо, якщо з фронта прийшли рядки)
  const money = Number(body.RE_MONEY) || 0;
  const sum = Number(body.RE_SUM) || money; // Якщо RE_SUM не прийшло, беремо з RE_MONEY
  const kurs = Number(body.RE_KURS) || 1;
  const schId = Number(body.RE_SCH_ID);
  const transSchId = body.RE_TRANS_SCH_ID ? Number(body.RE_TRANS_SCH_ID) : -1;

  // Валідація тегів
  let tags = body.RE_TAG;
  if (Array.isArray(tags)) tags = tags.join(', ');

  // Генерація унікального RE_ID
  if (!RE_ID) RE_ID = Date.now();
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
    // 1. Звичайний запис
    if (transSchId === -1) {
      const result = await Reestr.create({
        ...body,
        RE_ID,
        RE_SCH_ID: schId,
        RE_MONEY: money,
        RE_SUM: sum,
        RE_TAG: tags,
        RE_TRANS_SCH_ID: -1,
      });
      return res.status(200).json(result);
    }

    // 2. ПЕРЕКАЗ
    // Створюємо перший запис (мінус з поточного рахунку)
    const record1 = await Reestr.create({
      ...body,
      RE_ID,
      RE_SCH_ID: schId,
      RE_MONEY: money,
      RE_SUM: sum,
      RE_TAG: tags,
      RE_TRANS_RE: RE_ID + 1,
      RE_TRANS_SCH_ID: transSchId,
    });

    // Розрахунок для другого запису
    let money2 = Number(body.RE_MONEY_2);
    if (!money2) {
      // Якщо валюти однакові, просто міняємо знак, якщо різні - через курс
      money2 = Math.abs(money) === Math.abs(sum) ? sum / kurs : sum;
    }

    const record2 = await Reestr.create({
      ...body,
      RE_ID: record1.RE_TRANS_RE,
      RE_SCH_ID: transSchId,
      RE_MONEY: -money2, // Плюс на інший рахунок (якщо money був мінус)
      RE_SUM: -sum,
      RE_TAG: tags,
      RE_TRANS_RE: record1.RE_ID,
      RE_TRANS_SCH_ID: schId,
      RE_TAS_ID: body.RE_PAYE_ID,
    });

    res.status(200).json(record1);
  } catch (err) {
    console.error('Full Error info:', err); // Допоможе побачити точну помилку в терміналі
    next(new ValidationError(err.message || 'Bad request'));
  }
};

module.exports = createReestr;
