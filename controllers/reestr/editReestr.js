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
    RE_TRANS_RE,
    RE_KURS,
    RE_TAG,
    RE_SCH_ID,
  } = req.body;
  const { id } = req.params;

  try {
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
        RE_TRANS_RE,
        RE_KURS,
        RE_TAG,
        RE_SCH_ID,
      },
    );
    if (RE_TRANS_RE !== -1 || RE_TRANS_RE !== '-1') {
      const newEditReestr_2 = await Reestr.findOneAndUpdate(
        { RE_ID: RE_TRANS_RE },
        {
          RE_SCH_ID: newEditReestr.RE_TRANS_SCH_ID,
          RE_DATE,
          RE_KOMENT,
          RE_PAYE_ID,
          RE_CAT_ID,
          RE_CAT_ID0,
          RE_CAT_ID1,
          RE_MONEY: -newEditReestr.RE_MONEY,
          RE_TRANS_RE: newEditReestr.RE_ID,
          RE_TRANS_SCH_ID: newEditReestr.RE_SCH_ID,
          RE_KURS,
          RE_TAG,
          RE_TAS_ID: newEditReestr.RE_PAYE_ID,
        },
      );
    }
    res.status(200).json(newEditReestr);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editReestr;
