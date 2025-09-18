const { Reestr } = require('../../models');
let count = 1;

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
  // if (count === 1) {
  //   count += 1;
  //   console.log('start');
  //   try {
  //     const allDocs = await Reestr.find({}).lean();

  //     for (const doc of allDocs) {
  //       let newTransSchId = -1;

  //       if (doc.RE_TRANS_RE) {
  //         // шукаємо документ з таким RE_ID
  //         const linkedDoc = await Reestr.findOne({
  //           RE_ID: doc.RE_TRANS_RE,
  //         }).lean();
  //         console.log(linkedDoc);
  //         if (linkedDoc) {
  //           newTransSchId = linkedDoc.RE_SCH_ID;
  //         }
  //       }

  //       // оновлюємо поточний документ
  //       await Reestr.updateOne(
  //         { _id: doc._id },
  //         { $set: { RE_TRANS_SCH_ID: newTransSchId } },
  //       );
  //     }

  //     res
  //       .status(200)
  //       .json({ message: 'Оновлено RE_TRANS_SCH_ID для всіх документів' });
  //   } catch (error) {
  //     console.error('Помилка при оновленні RE_TRANS_SCH_ID:', error);
  //     res.status(500).json({ message: 'Помилка при обробці даних' });
  //   }
  // }
};
module.exports = getReestr;
