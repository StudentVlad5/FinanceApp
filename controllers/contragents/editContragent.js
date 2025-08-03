const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const editContragent = async (req, res, next) => {
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
    E,
  } = req.body;
  const { id } = req.params;
  try {
    const newEditContragent = await Contragents.findByIdAndUpdate(
      { _id: id },
      {
        PAYEE_ID,
        PAYEE_NAME,
        PAYEE_ADRES,
        PAYEE_CITY,
        PAYEE_TEL,
        PAYEE_SITE,
        PAYEE_KOMENT,
        PAYEE_HIDE,
        PAYEE_CON_ID,
      },
    );
    res.status(200).json(newEditContragent);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editContragent;
