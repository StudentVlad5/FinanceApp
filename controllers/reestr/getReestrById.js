// const { list } = require('../../CATEGORY');
const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');
// let count = 1;

const getReestrById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error('Некоректний ID');

    // цей код потрібен для переробки даних reestr

    const reestrById = await Reestr.aggregate([
      {
        $match: {
          RE_SCH_ID: numericId,
        },
      },
    ]);

    // Використовуємо цикл for...of для обробки асинхронних операцій
    // if(count === 1) {
    // count += 1;
    // for (const item of reestrById) {
    //   console.log('Start loop', item);

    //   // Шукаємо об'єкт в list, де CAT_ID === RE_CAT_ID
    //   const matchingItem = list.find((el) => el.CAT_ID === item.RE_CAT_ID);
    //   console.log('matchingItem', matchingItem);

    //   if (matchingItem) {
    //     // Перевіряємо, чи є ненульові значення в CAT_ID3, CAT_ID2, CAT_ID1, CAT_ID0
    //     if (matchingItem.CAT_ID3 !== 0) {
    //       item.RE_CAT_ID = matchingItem.CAT_ID3;
    //     } else if (matchingItem.CAT_ID2 !== 0) {
    //       item.RE_CAT_ID = matchingItem.CAT_ID2;
    //     } else if (matchingItem.CAT_ID1 !== 0) {
    //       item.RE_CAT_ID = matchingItem.CAT_ID1;
    //     } else if (matchingItem.CAT_ID0 !== 0) {
    //       item.RE_CAT_ID = matchingItem.CAT_ID0;
    //     }
    //   }

    //   // Оновлення документа в базі
    //   await Reestr.updateOne(
    //     { _id: item._id }, // Пошук за _id
    //     { $set: { RE_CAT_ID: item.RE_CAT_ID } }, // Оновлення тільки поля RE_CAT_ID
    //   );
    //   console.log('Saved changes for item with _id:', item._id);
    // }}

    res.status(200).json(reestrById);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getReestrById;
