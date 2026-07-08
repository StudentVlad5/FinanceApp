const { ValidationError } = require('../../helpers');
const { Reestr, Account, ExchangeRate } = require('../../models');

const editReestr = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const getUahSum = async (sId, sum, rawDate) => {
      // 1. Шукаємо рахунок
      const account = await Account.findOne({ SCH_ID: sId });

      // Якщо рахунок не знайдено або це гривня (код 980 або UAH) — повертаємо суму без змін
      if (
        !account ||
        String(account.SCH_CUR) === '980' ||
        String(account.SCH_CUR).toUpperCase() === 'UAH'
      ) {
        return sum;
      }

      // 2. Чистимо дату від ISO-хвостів, залишаємо суто рядок "YYYY-MM-DD"
      let currentStringDate = rawDate
        ? String(rawDate).split('T')[0]
        : new Date().toISOString().split('T')[0];
      let rateEntry = null;
      let attempts = 0;

      // 3. Безпечний цикл пошуку курсу (крокує назад до 10 днів, якщо немає точного збігу)
      while (!rateEntry && attempts < 10) {
        rateEntry = await ExchangeRate.findOne({
          // Шукаємо і за цифровим кодом ("978"), і за літерним ("EUR"), щоб уникнути розсинхрону
          $or: [
            { currency_code: String(account.SCH_CUR) },
            { valcode: String(account.SCH_CUR).toUpperCase() },
          ],
          date: { $lte: currentStringDate },
        }).sort({ date: -1 });

        if (!rateEntry) {
          // Відкочуємося на 1 день назад, якщо на поточну дату курсу немає
          const dateObj = new Date(currentStringDate);
          dateObj.setDate(dateObj.getDate() - 1);
          currentStringDate = dateObj.toISOString().split('T')[0];
          attempts++;
        }
      }

      // Якщо курс не знайшли взагалі — виводимо попередження в консоль сервера
      if (!rateEntry) {
        console.warn(
          `[WARNING] Курс для валюти ${account.SCH_CUR} не знайдено в БД (остання перевірена дата: ${currentStringDate}). Взято курс 1.`,
        );
      }

      // 4. Повертаємо перераховану суму
      const finalRate = rateEntry ? Number(rateEntry.rate) : 1;
      return sum * finalRate;
    };

    const currentSum =
      Number(body.RE_SUM) !== 0 ? Number(body.RE_SUM) : Number(body.RE_MONEY);
    const uahSumMain = await getUahSum(
      body.RE_SCH_ID,
      currentSum,
      body.RE_DATE,
    );

    const updatedMain = await Reestr.findOneAndUpdate(
      { _id: id },
      {
        ...body,
        RE_SUM_UAH: uahSumMain.toFixed(2).toString(),
      },
      { new: true },
    );

    // Оновлення парного запису (якщо переказ)
    if (
      body.RE_TRANS_SCH_ID &&
      body.RE_TRANS_SCH_ID !== -1 &&
      body.RE_TRANS_RE
    ) {
      const targetMoney = -Number(body.RE_MONEY_2) || -Number(body.RE_MONEY);
      const uahSumPair = await getUahSum(
        body.RE_TRANS_SCH_ID,
        -Number(body.RE_SUM),
        body.RE_DATE,
      );

      await Reestr.findOneAndUpdate(
        { RE_ID: body.RE_TRANS_RE },
        {
          RE_DATE: body.RE_DATE,
          RE_KOMENT: body.RE_KOMENT,
          RE_SCH_ID: body.RE_TRANS_SCH_ID,
          RE_MONEY: targetMoney,
          RE_SUM: -Number(body.RE_SUM),
          RE_SUM_UAH: uahSumPair.toFixed(2).toString(),
          RE_KURS: body.RE_KURS,
          RE_TAG: body.RE_TAG,
          RE_TRANS_SCH_ID: body.RE_SCH_ID,
          RE_TRANS_RE: body.RE_ID,
          RE_PAYE_ID: body.RE_PAYE_ID,
        },
      );
    }

    res.status(200).json(updatedMain);
  } catch (err) {
    next(new ValidationError('Error updating records'));
  }
};
module.exports = editReestr;
