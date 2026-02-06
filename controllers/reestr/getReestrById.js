const { ValidationError } = require('../../helpers');
const { Reestr } = require('../../models');

const getReestrById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error('Некоректний ID рахунку');

    // Використовуємо .find() замість агрегації для звичайного отримання списку
    // Це працює швидше для простих вибірок
    const reestrById = await Reestr.find({ RE_SCH_ID: numericId })
      .sort({ RE_DATE: -1 }) // Останні записи зверху
      // .limit(2000)           // Обмежуємо вибірку для стабільності фронту
      .lean(); // Повертає чисті JS об'єкти (швидше за Mongoose docs)

    res.status(200).json(reestrById);
  } catch (err) {
    // В express асинхронні помилки треба передавати в next()
    next(new ValidationError(err.message));
  }
};

module.exports = getReestrById;
