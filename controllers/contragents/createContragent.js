const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const createContragent = async (req, res, next) => {
  const {
    PAYEE_ID,
    PAYEE_NAME,
    PAYEE_ADRES,
    PAYEE_CITY,
    PAYEE_TEL,
    PAYEE_SITE,
    PAYEE_KOMENT,
    PAYEE_HIDE,
    PAYEE_CON_ID,
  } = req.body;
  try {
    const createNewContragent = await Contragents.create({
      PAYEE_ID,
      PAYEE_NAME,
      PAYEE_ADRES,
      PAYEE_CITY,
      PAYEE_TEL,
      PAYEE_SITE,
      PAYEE_KOMENT,
      PAYEE_HIDE,
      PAYEE_CON_ID,
    });
    console.log('createNewContragent', createNewContragent);
    res.status(200).json({
      success: true,
      data: createNewContragent,
    });
  } catch (err) {
    console.error(err); // для логів
    res
      .status(400)
      .json({ success: false, message: err.message || 'Something went wrong' });
  }
};

module.exports = createContragent;
