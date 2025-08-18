const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const createReestr = async (req, res, next) => {
  const {
    RE_ID,
    RE_SCH_ID,
    RE_DATE = Date.now(),
    RE_KOMENT,
    RE_PAYE_ID,
    RE_CAT_ID = 0,
    RE_CAT_ID0,
    RE_CAT_ID1,
    RE_MONEY,
    RE_SUM = 0,
    RE_INCR = 0,
    RE_TRANS_RE,
    RE_TRANS_SCH_ID,
    RE_KURS = 1,
    RE_TAG,
    RE_KVO,
    RE_TAS_ID,
    RE_CLEAR,
    RE_USER,
    RE_ATTACH,
  } = req.body;

  let isDuplicate = true;

  while (isDuplicate) {
    const existing = await Reestr.findOne({ RE_ID });
    console.log('existing', existing);
    if (!existing) {
      isDuplicate = false; // знайшли унікальне значення
    } else {
      RE_ID += 1; // пробуємо наступне
    }
  }
  try {
    if (RE_TRANS_SCH_ID === -1 || RE_TRANS_SCH_ID === '-1') {
      const createNewReestr = await Reestr.create({
        RE_ID,
        RE_SCH_ID,
        RE_DATE,
        RE_KOMENT,
        RE_PAYE_ID,
        RE_CAT_ID,
        RE_CAT_ID0,
        RE_CAT_ID1,
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
      res.status(200).json(createNewReestr);
    } else {
      const createNewReestr_1 = await Reestr.create({
        RE_ID,
        RE_SCH_ID,
        RE_DATE,
        RE_KOMENT,
        RE_PAYE_ID,
        RE_CAT_ID,
        RE_CAT_ID0,
        RE_CAT_ID1,
        RE_MONEY,
        RE_SUM,
        RE_INCR,
        RE_TRANS_RE: RE_SCH_ID + 1,
        RE_TRANS_SCH_ID,
        RE_KURS,
        RE_TAG,
        RE_KVO,
        RE_TAS_ID,
        RE_CLEAR,
        RE_USER,
        RE_ATTACH,
      });
      const createNewReestr_2 = await Reestr.create({
        RE_ID: createNewReestr_1.RE_TRANS_RE,
        RE_SCH_ID: createNewReestr_1.RE_TRANS_SCH_ID,
        RE_DATE,
        RE_KOMENT,
        RE_PAYE_ID,
        RE_CAT_ID,
        RE_CAT_ID0,
        RE_CAT_ID1,
        RE_MONEY,
        RE_SUM,
        RE_INCR,
        RE_TRANS_RE: createNewReestr_1.RE_ID,
        RE_TRANS_SCH_ID: createNewReestr_1.RE_SCH_ID,
        RE_KURS,
        RE_TAG,
        RE_KVO,
        RE_TAS_ID: createNewReestr_1.RE_PAYE_ID,
        RE_CLEAR,
        RE_USER,
        RE_ATTACH,
      });
      console.log('createNewReestr_2', createNewReestr_2);
      res.status(200).json(createNewReestr_1);
    }
  } catch (err) {
    console.error('Create Reestr Error:', err);
    next(new ValidationError('Bad request (invalid request body)'));
  }
};

module.exports = createReestr;
