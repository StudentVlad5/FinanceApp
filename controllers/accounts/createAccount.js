const { ValidationError } = require('../../helpers');
const { Account } = require('../../models');

const createAccount = async (req, res, next) => {
  const {
    SCH_ID,
    SCH_NAME,
    SCH_GROUP,
    SCH_CUR,
    SCH_TYPE,
    SCH_VIEW,
    SCH_DATE,
    SCH_VID,
    SCH_BANK_NAME,
    SCH_KONTAKT_NAME,
    SCH_KONTAKT_TEL,
    SCH_KOL_AMORTIZ,
    SCH_PROC,
    SCH_PAYEE,
    SCH_TYPE_PROC,
    SCH_PERIOD,
    SCH_PERIOD_NACH_PROC,
    SCH_DATE_CREDIT,
    SCH_KOM_MES,
    SCH_W,
    SCH_SUM,
    SCH_MEMO,
    SCH_CDATE,
    SCH_CSUM,
    SCH_SYNC,
    SCH_HIDE,
  } = req.body;
  try {
    const createNewAccount = await Account.create({
      SCH_ID,
      SCH_NAME,
      SCH_GROUP,
      SCH_CUR,
      SCH_TYPE,
      SCH_VIEW,
      SCH_DATE,
      SCH_VID,
      SCH_BANK_NAME,
      SCH_KONTAKT_NAME,
      SCH_KONTAKT_TEL,
      SCH_KOL_AMORTIZ,
      SCH_PROC,
      SCH_PAYEE,
      SCH_TYPE_PROC,
      SCH_PERIOD,
      SCH_PERIOD_NACH_PROC,
      SCH_DATE_CREDIT,
      SCH_KOM_MES,
      SCH_W,
      SCH_SUM,
      SCH_MEMO,
      SCH_CDATE,
      SCH_CSUM,
      SCH_SYNC,
      SCH_HIDE,
    });

    res.status(200).json({
      success: true,
      data: createNewAccount,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createAccount;
