const { ValidationError } = require('../../helpers');
const { Reestr, Account, ExchangeRate } = require('../../models');

// const editReestr = async (req, res, next) => {
//   const { id } = req.params;
//   const body = req.body;

//   try {
//     const {
//       RE_ID,
//       RE_DATE,
//       RE_KOMENT,
//       RE_SCH_ID,
//       RE_MONEY,
//       RE_SUM,
//       RE_KURS,
//       RE_TAG,
//       RE_TRANS_SCH_ID,
//       RE_TRANS_RE,
//       RE_PAYE_ID,
//     } = body;

//     const updatedMain = await Reestr.findOneAndUpdate(
//       { _id: id },
//       {
//         RE_ID,
//         RE_DATE,
//         RE_KOMENT,
//         RE_SCH_ID,
//         RE_MONEY,
//         RE_SUM,
//         RE_KURS,
//         RE_TAG,
//         RE_TRANS_SCH_ID,
//         RE_TRANS_RE,
//         RE_PAYE_ID,
//       },
//       { new: true },
//     );

//     if (RE_TRANS_SCH_ID && RE_TRANS_SCH_ID !== -1 && RE_TRANS_RE) {
//       const targetMoney = -Number(body.RE_MONEY_2) || -Number(RE_MONEY);

//       await Reestr.findOneAndUpdate(
//         { RE_ID: RE_TRANS_RE },
//         {
//           RE_DATE,
//           RE_KOMENT,
//           RE_SCH_ID: RE_TRANS_SCH_ID,
//           RE_MONEY: targetMoney,
//           RE_SUM: -Number(RE_SUM),
//           RE_KURS,
//           RE_TAG,
//           RE_TRANS_SCH_ID: RE_SCH_ID,
//           RE_TRANS_RE: RE_ID,
//           RE_PAYE_ID: RE_PAYE_ID,
//         },
//       );
//     }

//     res.status(200).json(updatedMain);
//   } catch (err) {
//     next(new ValidationError('Error updating records'));
//   }
// };

const editReestr = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const getUahSum = async (sId, sum, date) => {
      const account = await Account.findOne({ SCH_ID: sId });
      if (!account || account.SCH_CUR === '980') return sum;
      const rateEntry = await ExchangeRate.findOne({
        date,
        currency_code: account.SCH_CUR,
      });
      return sum * (rateEntry ? rateEntry.rate : 1);
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
