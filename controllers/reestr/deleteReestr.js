const { Reestr } = require('../../models');

const deleteReestr = async (req, res, next) => {
  const { id } = req.params;

  try {
    // 1. Знаходимо документ, щоб отримати RE_ID
    const doc = await Reestr.findById(id);
    if (!doc) {
      return res.status(400).json({ message: 'Bad request (Невірний Id)' });
    }

    const reId = doc.RE_ID;

    // 2. Видаляємо сам документ
    await Reestr.deleteOne({ _id: id });

    // 3. Видаляємо інші записи, у яких RE_TRANS_RE === reId
    const linkedDeleteResult = await Reestr.deleteMany({ RE_TRANS_RE: reId });

    return res.status(202).json({
      message: 'Видалення успішне',
      deletedLinkedCount: linkedDeleteResult.deletedCount,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ message: 'Bad request (відсутнє id або помилка)' });
  }
};

module.exports = deleteReestr;
