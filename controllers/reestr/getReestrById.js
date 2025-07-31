const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const getReestrById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error('Некоректний ID');

    // Витягуємо всі документи
    const allDocs = await Reestr.find();

    // Створюємо словник {RE_SCH_ID: [RE_ID]}
    const dictionary = {};

    allDocs.forEach((doc) => {
      const { RE_SCH_ID, RE_ID } = doc;
      if (!dictionary[RE_SCH_ID]) {
        dictionary[RE_SCH_ID] = [];
      }

      if (RE_ID !== -1) {
        dictionary[RE_SCH_ID].push(RE_ID);
      } else {
        dictionary[RE_SCH_ID] = [-1]; // Якщо RE_ID === -1, то ставимо RE_SCH_ID = -1
      }
    });

    let updatedCount = 0;

    // Оновлюємо кожен документ
    for (const doc of allDocs) {
      const transReId = doc.RE_TRANS_RE;

      // Якщо RE_TRANS_RE не знайдений у словнику, пропускаємо
      let transSchId = -1;

      // Шукаємо в словнику, де RE_ID є частиною значення RE_SCH_ID
      for (const key in dictionary) {
        if (dictionary[key].includes(transReId)) {
          transSchId = Number(key); // Встановлюємо RE_SCH_ID як ключ з словника
          break;
        }
      }

      // Перевірка, чи правильний _id і чи є документ
      const docToUpdate = await Reestr.findOne({ _id: doc._id });
      if (!docToUpdate) {
        console.log(`Документ з _id ${doc._id} не знайдений.`);
        continue;
      }

      // Оновлюємо документ з новим RE_TRANS_SCH_ID
      let updateResult = await Reestr.findById({ _id: doc._id });

      const updatedDoc = {
        RE_DATE: updateResult.RE_DATE,
        RE_KOMENT: updateResult.RE_KOMENT,
        RE_PAYE_ID: Number(updateResult.RE_PAYE_ID),
        RE_CAT_ID: Number(updateResult.RE_CAT_ID),
        RE_MONEY: updateResult.RE_MONEY,
        RE_SUM: updateResult.RE_SUM,
        RE_INCR: Number(updateResult.RE_INCR),
        RE_TRANS_RE: Number(updateResult.RE_TRANS_RE),
        RE_KURS: updateResult.RE_KURS,
        RE_TAG: updateResult.RE_TAG,
        RE_KVO: updateResult.RE_KVO,
        RE_TAS_ID: Number(updateResult.RE_TAS_ID),
        RE_CLEAR: Number(updateResult.RE_CLEAR),
        RE_USER: updateResult.RE_USER,
        RE_ATTACH: updateResult.RE_ATTACH,
        RE_SCH_ID: Number(updateResult.RE_SCH_ID),
        RE_ID: Number(updateResult.RE_ID),
        RE_TRANS_SCH_ID: Number(transSchId), // Встановлюємо нове значення
      };

      // Перезаписуємо документ
      let removeResult = await Reestr.replaceOne(
        { _id: doc._id },
        updatedDoc, // перезаписуємо всі дані
      );

      if (removeResult.nModified === 0) {
        console.log(
          `Документ з _id ${doc._id} не оновлений, можливо, значення не змінилося.`,
        );
      }

      updatedCount++;

      // Лог кожні 500 оновлень
      if (updatedCount % 50 === 0) {
        console.log(`🔄 Оновлено ${updatedCount} документів`);
      }
    }

    console.log(`✅ Усього оновлено: ${updatedCount} документів`);

    // Відправляємо результат (якщо потрібно)
    // const reestrById = await Reestr.aggregate([
    //   {
    //     $match: {
    //       RE_SCH_ID: numericId,
    //     },
    //   },
    // ]);
    // res.status(200).json(reestrById);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getReestrById;
