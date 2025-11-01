const { ValidationError } = require('../../helpers');
const { Currency } = require('../../models');

const createCurrency = async (req, res, next) => {
  console.log('req.body', req.body);
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
  try {
    const createNewCurrency = await Currency.create({
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
    });
    res.status(200).json(createNewCurrency);
  } catch (err) {
    throw new ValidationError('Bad request (invalid request body)');
  }
};

module.exports = createCurrency;
