const { ValidationError } = require('../../helpers');
const { Contragents } = require('../../models');

const editContragent = async (req, res, next) => {
  const { CAT0_ID, CAT0_NAME } = req.body;
  const { id } = req.params;
  try {
    const newEditContragent = await Contragents.findByIdAndUpdate(
      { _id: id },
      {
        CAT0_ID,
        CAT0_NAME,
      },
    );
    res.status(200).json(newEditContragent);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editContragent;
