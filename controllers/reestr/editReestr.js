const { ValidationError } = require('../../helpers');
const { Reestr, Account, ExchangeRate } = require('../../models');

const editReestr = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const getUahSum = async (sId, sum, rawDate) => {
      // Шукаємо аккаунт, пробуючи обидва типи (і як число, і як рядок)
      const account = await Account.findOne({
        $or: [{ SCH_ID: Number(sId) }, { SCH_ID: String(sId) }],
      });

      // Лог для перевірки: чи знайшовся рахунок і яка в ньому валюта
      console.log(
        `[DEBUG] Рахунок ID: ${sId}, Знайдено в БД: ${!!account}, Валюта: ${account ? account.SCH_CUR : 'немає'}`,
      );

      if (
        !account ||
        String(account.SCH_CUR) === '980' ||
        String(account.SCH_CUR).toUpperCase() === 'UAH'
      ) {
        return sum;
      }

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
        `[DEBUG] Знайдений курс: ${rateEntry ? rateEntry.rate : 'НЕ ЗНАЙДЕНО (взято 1)'} на дату: ${currentStringDate}`,
      );

      const finalRate = rateEntry ? Number(rateEntry.rate) : 1;
      return sum * finalRate;
    };

    // Нормалізуємо суму (перетворюємо рядок "27000" на число)
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
        RE_SUM: currentSum, // Перевизначаємо як число
        RE_MONEY: Number(body.RE_MONEY), // Перевизначаємо як число
        RE_SUM_UAH: uahSumMain.toFixed(2).toString(), // Перевизначаємо пораховану суму
      },
      { new: true },
    );

    // Оновлення парного запису (безпечна перевірка на -1)
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
          RE_SCH_ID: transSchId,
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
    console.error(err);
    next(new ValidationError('Error updating records'));
  }
};

module.exports = editReestr;
