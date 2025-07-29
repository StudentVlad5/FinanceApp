const { Currency } = require('../../models');

const deleteCurrency = async (req, res, next) => {
  const { id } = req.params;
  try {
    const сurrency = await Currency.deleteOne({ _id: id });
    if (сurrency.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (невірне id)` });
    }
    return res.status(204).json({ message: 'Відсутній контент' });
  } catch (e) {
    return res.status(400).json({ message: '`Bad request (відсутнє id)' });
  }
};
module.exports = deleteCurrency;
