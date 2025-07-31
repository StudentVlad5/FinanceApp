const { Reestr, Group } = require('../../models');

const getReestr = async (req, res) => {
  try {
    const aggregatedData = await Reestr.aggregate([
      {
        $group: {
          _id: { schId: '$RE_SCH_ID' },
          totalMoney: { $sum: { $toDouble: '$RE_MONEY' } },
        },
      },
    ]);
    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error('Помилка при агрегуванні:', error);
    res.status(500).json({ message: 'Помилка при обробці даних' });
  }
};
module.exports = getReestr;
