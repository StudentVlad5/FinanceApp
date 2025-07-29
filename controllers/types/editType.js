const { ValidationError } = require('../../helpers');
const { Types } = require('../../models');

const editType = async (req, res, next) => {
  const { TPSCH_ID, TPSCH_NAME } = req.body;
  const { id } = req.params;
  try {
    const newEditType = await Types.findByIdAndUpdate(
      { _id: id },
      {
        TPSCH_ID,
        TPSCH_NAME,
      },
    );
    res.status(200).json(newEditType);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editType;
