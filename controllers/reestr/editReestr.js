const { ValidationError } = require('../../helpers');
const { Reestr, Account, ExchangeRate } = require('../../models');

const editReestr = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const getUahSum = async (sId, sum, rawDate) => {
      // Примусово перетворюємо ID на число, бо в базі це Int32
      const numericId = Number(sId);

      // Шукаємо рахунок за числовим ID
      const account = await Account.findOne({ SCH_ID: numericId });

      console.log(
        `[DEBUG] Шукаємо SCH_ID (Number): ${numericId}. Знайдено: ${!!account}, Валюта: ${account ? account.SCH_CUR : 'немає'}`,
      );

      // Якщо рахунок не знайдено або це гривня (код 980 або UAH) — повертаємо суму без змін
      if (
        !account ||
        String(account.SCH_CUR) === '980' ||
        String(account.SCH_CUR).toUpperCase() === 'UAH'
      ) {
        return sum;
      }

      // Очищаємо дату від ISO-хвостів, залишаємо тільки "YYYY-MM-DD"
      let currentStringDate = rawDate
        ? String(rawDate).split('T')[0]
        : new Date().toISOString().split('T')[0];

      let rateEntry = null;
      let attempts = 0;

      // Цикл пошуку курсу (крокує назад до 10 днів)
      while (!rateEntry && attempts < 10) {
        rateEntry = await ExchangeRate.findOne({
          $or: [
            { currency_code: String(account.SCH_CUR).trim() },
            { valcode: String(account.SCH_CUR).toUpperCase().trim() },
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
        `[DEBUG] Курс для валюти ${account.SCH_CUR}: ${rateEntry ? rateEntry.rate : 'НЕ ЗНАЙДЕНО (взято 1)'} на дату: ${currentStringDate}`,
      );

      const finalRate = rateEntry ? Number(rateEntry.rate) : 1;
      return sum * finalRate;
    };

    // Конвертуємо суми з фронтенду в числа
    const currentSum =
      Number(body.RE_SUM) !== 0 ? Number(body.RE_SUM) : Number(body.RE_MONEY);

    // Рахуємо гривневу суму
    const uahSumMain = await getUahSum(
      body.RE_SCH_ID,
      currentSum,
      body.RE_DATE,
    );

    // Оновлюємо основний запис
    const updatedMain = await Reestr.findOneAndUpdate(
      { _id: id },
      {
        ...body,
        RE_SUM: currentSum,
        RE_MONEY: Number(body.RE_MONEY),
        RE_SUM_UAH: uahSumMain.toFixed(2).toString(), // ТУТ ТЕПЕР БУДЕ ПРАВИЛЬНА СУМА З КУРСОМ!
      },
      { new: true },
    );

    // Оновлення парного запису (якщо це переказ)
    const transSchId = Number(body.RE_TRANS_SCH_ID);
    if (body.RE_TRANS_SCH_ID && transSchId !== -1 && body.RE_TRANS_RE) {
      const targetMoney = -Number(body.RE_MONEY_2) || -Number(body.RE_MONEY);
      const uahSumPair = await getUahSum(
        body.RE_TRANS_SCH_ID,
        -currentSum,
        body.RE_DATE,
      );

      await Reestr.findOneAndUpdate(
        { RE_ID: body.RE_TRANS_RE },
        {
          RE_DATE: body.RE_DATE,
          RE_KOMENT: body.RE_KOMENT,
          RE_SCH_ID: Number(body.RE_TRANS_SCH_ID),
          RE_MONEY: targetMoney,
          RE_SUM: -currentSum,
          RE_SUM_UAH: uahSumPair.toFixed(2).toString(),
          RE_KURS: Number(body.RE_KURS),
          RE_TAG: Array.isArray(body.RE_TAG)
            ? body.RE_TAG.join(', ')
            : body.RE_TAG,
          RE_TRANS_SCH_ID: Number(body.RE_SCH_ID),
          RE_TRANS_RE: body.RE_ID,
          RE_PAYE_ID: body.RE_PAYE_ID,
        },
      );
    }

    res.status(200).json(updatedMain);
  } catch (err) {
    console.error('[ERROR]', err);
    next(new ValidationError('Error updating records'));
  }
};

module.exports = editReestr;
