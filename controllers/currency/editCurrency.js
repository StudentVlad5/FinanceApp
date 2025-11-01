const { ValidationError } = require('../../helpers');
const { Currency } = require('../../models');

const editCurrency = async (req, res, next) => {
  const {
    CUR_ID,
    CUR_SHOT_NAME,
    CUR_NAME,
    CUR_SHOT_NAME_US,
    CUR_VIEW,
    CUR_TYPE,
    CUR_LOW,
    CUR_HIGH,
    CUR_UPDATE,
    CUR_ACTIVE,
  } = req.body;
  const { id } = req.params;

  try {
    const editCurrency = await Currency.findByIdAndUpdate(
      id,
      {
        CUR_ID,
        CUR_SHOT_NAME,
        CUR_NAME,
        CUR_SHOT_NAME_US,
        CUR_VIEW,
        CUR_TYPE,
        CUR_LOW,
        CUR_HIGH,
        CUR_UPDATE,
        CUR_ACTIVE,
      },
      {
        new: true,
        useFindAndModify: false,
      },
    );

    if (!editCurrency) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    res.status(200).json(editCurrency);
  } catch (err) {
    next(
      new ValidationError(
        'Bad request (Невірно передані параметри для збереження даних)',
      ),
    );
  }
};

module.exports = editCurrency;
