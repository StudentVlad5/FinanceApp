const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const editReestr = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    // 1. Оновлюємо основний запис
    // Витягуємо лише те, що точно є в моделі (щоб не було сміття)
    const {
      RE_ID,
      RE_DATE,
      RE_KOMENT,
      RE_SCH_ID,
      RE_MONEY,
      RE_SUM,
      RE_KURS,
      RE_TAG,
      RE_TRANS_SCH_ID,
      RE_TRANS_RE,
      RE_PAYE_ID,
    } = body;

    const updatedMain = await Reestr.findOneAndUpdate(
      { _id: id },
      {
        RE_ID,
        RE_DATE,
        RE_KOMENT,
        RE_SCH_ID,
        RE_MONEY,
        RE_SUM,
        RE_KURS,
        RE_TAG,
        RE_TRANS_SCH_ID,
        RE_TRANS_RE,
        RE_PAYE_ID,
      },
      { new: true },
    );

    // 2. Якщо це переказ, оновлюємо парний запис через RE_TRANS_RE
    if (RE_TRANS_SCH_ID && RE_TRANS_SCH_ID !== -1 && RE_TRANS_RE) {
      // RE_MONEY_2 використовуємо лише для розрахунку, в базу він не йде
      const targetMoney = -Number(body.RE_MONEY_2) || -Number(RE_MONEY);

      await Reestr.findOneAndUpdate(
        { RE_ID: RE_TRANS_RE },
        {
          RE_DATE,
          RE_KOMENT,
          RE_SCH_ID: RE_TRANS_SCH_ID,
          RE_MONEY: targetMoney, // Записуємо в стандартне поле моделі
          RE_SUM: -Number(RE_SUM),
          RE_KURS,
          RE_TAG,
          RE_TRANS_SCH_ID: RE_SCH_ID,
          RE_TRANS_RE: RE_ID,
          RE_PAYE_ID: RE_PAYE_ID,
        },
      );
    }

    res.status(200).json(updatedMain);
  } catch (err) {
    next(new ValidationError('Error updating records'));
  }
};
module.exports = editReestr;
