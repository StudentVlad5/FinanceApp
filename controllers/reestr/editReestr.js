const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const editReestr = async (req, res, next) => {
  const {
    RE_ID,
    RE_TRANS_SCH_ID,
    RE_DATE,
    RE_KOMENT,
    RE_PAYE_ID,
    RE_CAT_ID,
    RE_CAT_ID0,
    RE_CAT_ID1,
    RE_MONEY,
    RE_SUM,
    RE_MONEY_2,
    RE_TRANS_RE,
    RE_KURS,
    RE_TAG,
    RE_SCH_ID,
  } = req.body;
  const { id } = req.params;

  try {
    // Оновлюємо основний запис
    const newEditReestr = await Reestr.findOneAndUpdate(
      { _id: id },
      {
        RE_ID,
        RE_TRANS_SCH_ID,
        RE_DATE,
        RE_KOMENT,
        RE_PAYE_ID,
        RE_CAT_ID,
        RE_CAT_ID0,
        RE_CAT_ID1,
        RE_MONEY,
        RE_SUM,
        RE_TRANS_RE,
        RE_KURS,
        RE_TAG,
        RE_SCH_ID,
      },
      { new: true }, // Отримуємо вже оновлений об'єкт
    );

    // Якщо це переказ, оновлюємо пов'язаний запис
    if (RE_TRANS_SCH_ID !== -1 && RE_TRANS_SCH_ID !== '-1') {
      let secondAccountMoney;

      if (RE_MONEY_2 !== undefined && RE_MONEY_2 !== null) {
        secondAccountMoney = Number(RE_MONEY_2);
      } else {
        const currentKurs = Number(RE_KURS) || 1;
        const currentMoney = Number(RE_MONEY);
        const currentSum = Number(RE_SUM);

        // Якщо RE_MONEY == RE_SUM (з урахуванням знаку), значить перший рахунок - ГРН
        if (Math.abs(currentMoney) === Math.abs(currentSum)) {
          secondAccountMoney = currentSum / currentKurs;
        } else {
          secondAccountMoney = currentSum;
        }
      }

      await Reestr.findOneAndUpdate(
        { RE_ID: RE_TRANS_RE },
        {
          RE_SCH_ID: RE_TRANS_SCH_ID,
          RE_DATE,
          RE_KOMENT,
          RE_PAYE_ID,
          RE_CAT_ID,
          RE_CAT_ID0,
          RE_CAT_ID1,
          RE_MONEY: -secondAccountMoney,
          RE_SUM: -Number(RE_SUM),
          RE_TRANS_RE: RE_ID,
          RE_TRANS_SCH_ID: RE_SCH_ID,
          RE_KURS,
          RE_TAG,
          RE_TAS_ID: RE_PAYE_ID,
        },
      );
    }
    res.status(200).json(newEditReestr);
  } catch (err) {
    next(new ValidationError('Bad request (Невірний контекст або помилка БД)'));
  }
};
module.exports = editReestr;
