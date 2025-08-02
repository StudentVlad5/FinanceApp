const { Contragents } = require('../../models');

const deleteContragent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contragent = await Contragents.deleteOne({ _id: id });
    if (contragent.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (Невірний Id)` });
    }
    return res.status(204).json({ message: 'Відсутній контент' });
  } catch (e) {
    return res.status(400).json({ message: 'Bad request (відсутнє id)' });
  }
};
module.exports = deleteContragent;
