const { Reestr } = require('../../models');
// const list = require('../../CATEGORY');

// let count = 1;

const getReestr = async (req, res) => {
  try {
    // const aggregatedData = await Reestr.find();
    const aggregatedData = await Reestr.aggregate([
      {
        $group: {
          _id: { schId: '$RE_SCH_ID' },
          totalMoney: { $sum: { $toDouble: '$RE_MONEY' } },
        },
      },
    ]);

    // Використовуємо цикл for...of для обробки асинхронних операцій
    //   if (count === 1) {
    //     count += 1;
    //     for (const item of aggregatedData) {
    //       console.log('Start loop', item);

    //       // Шукаємо об'єкт в list, де CAT_ID === RE_CAT_ID
    //       const matchingItem = list.find((el) => el.CAT_ID === item.RE_CAT_ID);
    //       console.log('matchingItem', matchingItem);

    //       if (matchingItem) {
    //         // Перевіряємо, чи є ненульові значення в CAT_ID3, CAT_ID2, CAT_ID1, CAT_ID0
    //         if (matchingItem.CAT_ID3 !== 0) {
    //           item.RE_CAT_ID = matchingItem.CAT_ID3;
    //         } else if (matchingItem.CAT_ID2 !== 0) {
    //           item.RE_CAT_ID = matchingItem.CAT_ID2;
    //         } else if (matchingItem.CAT_ID1 !== 0) {
    //           item.RE_CAT_ID = matchingItem.CAT_ID1;
    //         } else if (matchingItem.CAT_ID0 !== 0) {
    //           item.RE_CAT_ID = matchingItem.CAT_ID0;
    //         }
    //       }

    //       // Оновлення документа в базі
    //       await Reestr.updateOne(
    //         { _id: item._id }, // Пошук за _id
    //         { $set: { RE_CAT_ID: item.RE_CAT_ID } }, // Оновлення тільки поля RE_CAT_ID
    //       );
    //       console.log('Saved changes for item with _id:', item._id);
    //     }
    //   }

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
