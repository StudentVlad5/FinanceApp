const { ValidationError } = require('../../helpers');
const { Group } = require('../../models');

const editGroup = async (req, res, next) => {
  const { SCHG_ID, SCHG_NAME } = req.body;
  const { id } = req.params;
  try {
    const newEditGroup = await Group.findByIdAndUpdate(
      { _id: id },
      {
        SCHG_ID,
        SCHG_NAME,
      },
    );
    res.status(200).json(newEditGroup);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editGroup;
