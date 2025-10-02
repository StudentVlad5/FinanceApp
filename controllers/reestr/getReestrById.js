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

    res.status(200).json(reestrById);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getReestrById;
