const { ValidationError } = require('../../helpers');
const { Tags } = require('../../models');

const editTag = async (req, res, next) => {
  const { TG_ID, TG_NAME } = req.body;
  const { id } = req.params;
  try {
    const newEditTag = await Tags.findByIdAndUpdate(
      { _id: id },
      {
        TG_ID,
        TG_NAME,
      },
    );
    res.status(200).json(newEditTag);
  } catch (err) {
    throw new ValidationError('Bad request (Невірний контекст)');
  }
};
module.exports = editTag;
