const { Tags } = require('../../models');

const deleteTag = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tag = await Tags.deleteOne({ _id: id });
    if (tag.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (Невірний Id)` });
    }
    return res.status(204).json({ message: 'Відсутній контент' });
  } catch (e) {
    return res.status(400).json({ message: 'Bad request (відсутнє id)' });
  }
};
module.exports = deleteTag;
